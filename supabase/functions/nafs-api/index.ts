import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: corsHeaders });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return json({ ok: true });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const db = createClient(supabaseUrl, serviceRoleKey);

    // Existing login flow: keep school code + admin PIN.
    if (body.action === "login") {
      const schoolCode = String(body.school_code || "").trim();
      const pin = String(body.pin || "").trim();
      const rpc = await db.rpc("nafs_admin_report", {
        p_school_code: schoolCode,
        p_admin_pin: pin,
      });
      if (rpc.error) throw new Error("بيانات الدخول غير صحيحة");

      const school = await db
        .from("nafs_schools")
        .select("school_name,school_code,admin_token")
        .eq("school_code", schoolCode)
        .single();
      if (school.error) throw new Error("بيانات الدخول غير صحيحة");
      return json(school.data);
    }

    // Legacy school/share-token actions kept for backward compatibility.
    if (body.action === "school") {
      const token = String(body.share || body.school || "");
      const school = await db
        .from("nafs_schools")
        .select("school_name,school_code,share_token")
        .eq("share_token", token)
        .single();
      if (school.error) throw new Error("رابط غير صالح");
      return json({ school_name: school.data.school_name, share_token: school.data.share_token });
    }

    if (body.action === "list") {
      const admin = String(body.admin || "");
      const school = await db
        .from("nafs_schools")
        .select("school_code,school_name,share_token")
        .eq("admin_token", admin)
        .single();
      if (school.error) throw new Error("صلاحية الإدارة غير صحيحة");

      const q = await db
        .from("nafs_followups")
        .select("id,teacher_name,period,lesson_date,item_bank,item_hots,item_keys_feedback,item_diagnosis,created_at")
        .eq("school_code", school.data.school_code)
        .is("report_id", null)
        .order("lesson_date", { ascending: true })
        .order("created_at", { ascending: true });
      if (q.error) throw q.error;
      return json({
        school_name: school.data.school_name,
        share_token: school.data.share_token,
        entries: q.data,
      });
    }

    if (body.action === "save") {
      const share = String(body.share || "");
      const school = await db
        .from("nafs_schools")
        .select("school_code")
        .eq("share_token", share)
        .single();
      if (school.error) throw new Error("رابط المدرسة غير صالح");
      const e = body.entry || {};
      const q = await db
        .from("nafs_followups")
        .insert({
          school_code: school.data.school_code,
          teacher_name: String(e.teacher_name || "").trim(),
          period: String(e.period || "").trim(),
          lesson_date: e.lesson_date,
          item_bank: !!e.item_bank,
          item_hots: !!e.item_hots,
          item_keys_feedback: !!e.item_keys_feedback,
          item_diagnosis: !!e.item_diagnosis,
        })
        .select("id")
        .single();
      if (q.error) throw q.error;
      return json({ ok: true, id: q.data.id });
    }

    // Separate reports management.
    if (["reports", "create_report", "report", "close_report"].includes(body.action)) {
      const admin = String(body.admin || "");
      const school = await db
        .from("nafs_schools")
        .select("school_code,school_name")
        .eq("admin_token", admin)
        .single();
      if (school.error) throw new Error("صلاحية الإدارة غير صحيحة");

      if (body.action === "reports") {
        const r = await db
          .from("nafs_reports")
          .select("id,report_token,title,status,created_at,closed_at")
          .eq("school_code", school.data.school_code)
          .order("created_at", { ascending: false });
        if (r.error) throw r.error;
        return json({ school_name: school.data.school_name, reports: r.data });
      }

      if (body.action === "create_report") {
        const title = String(body.title || "تقرير نافس").trim() || "تقرير نافس";
        const r = await db
          .from("nafs_reports")
          .insert({ school_code: school.data.school_code, title })
          .select("id,report_token,title,status,created_at")
          .single();
        if (r.error) throw r.error;
        return json(r.data);
      }

      if (body.action === "close_report") {
        const r = await db
          .from("nafs_reports")
          .update({ status: "closed", closed_at: new Date().toISOString() })
          .eq("id", body.report_id)
          .eq("school_code", school.data.school_code)
          .eq("status", "open")
          .select("id")
          .single();
        if (r.error) throw new Error("تعذر حفظ التقرير");
        return json({ ok: true });
      }

      const r = await db
        .from("nafs_reports")
        .select("id,report_token,title,status,created_at,closed_at")
        .eq("id", body.report_id)
        .eq("school_code", school.data.school_code)
        .single();
      if (r.error) throw new Error("التقرير غير موجود");
      const q = await db
        .from("nafs_followups")
        .select("id,teacher_name,period,lesson_date,item_bank,item_hots,item_keys_feedback,item_diagnosis,created_at")
        .eq("report_id", r.data.id)
        .order("lesson_date", { ascending: true })
        .order("created_at", { ascending: true });
      if (q.error) throw q.error;
      return json({ school_name: school.data.school_name, report: r.data, entries: q.data });
    }

    // Teacher link bound to one report.
    if (body.action === "teacher_report") {
      const token = String(body.report || "");
      const r = await db
        .from("nafs_reports")
        .select("id,title,status,school_code")
        .eq("report_token", token)
        .single();
      if (r.error || r.data.status !== "open") throw new Error("هذا التقرير مغلق أو الرابط غير صالح");
      const school = await db
        .from("nafs_schools")
        .select("school_name")
        .eq("school_code", r.data.school_code)
        .single();
      return json({ school_name: school.data?.school_name || "", title: r.data.title });
    }

    if (body.action === "save_report_entry") {
      const token = String(body.report || "");
      const r = await db
        .from("nafs_reports")
        .select("id,status,school_code")
        .eq("report_token", token)
        .single();
      if (r.error || r.data.status !== "open") throw new Error("هذا التقرير مغلق أو الرابط غير صالح");
      const e = body.entry || {};
      if (!String(e.teacher_name || "").trim() || !String(e.period || "").trim() || !e.lesson_date) {
        throw new Error("البيانات غير مكتملة");
      }
      const q = await db
        .from("nafs_followups")
        .insert({
          report_id: r.data.id,
          school_code: r.data.school_code,
          teacher_name: String(e.teacher_name).trim(),
          period: String(e.period).trim(),
          lesson_date: e.lesson_date,
          item_bank: !!e.item_bank,
          item_hots: !!e.item_hots,
          item_keys_feedback: !!e.item_keys_feedback,
          item_diagnosis: !!e.item_diagnosis,
        })
        .select("id")
        .single();
      if (q.error) throw q.error;
      return json({ ok: true, id: q.data.id });
    }

    throw new Error("طلب غير معروف");
  } catch (error) {
    return json({ error: String(error?.message || error) }, 400);
  }
});
