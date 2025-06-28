import { createClient } from "@/utils/supabase/server";

export async function checkAndUpdateApiUsage(userId: string, limit: number) {
  const supabase = await createClient();

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const { data: usage, error: usageError } = await supabase
    .from("api_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (usageError && usageError.code !== "PGRST116") {
    throw new Error("利用回数確認中にエラーが発生しました");
  }

  if (!usage) {
    const { error: insertError } = await supabase
      .from("api_usage")
      .insert({ user_id: userId, date: todayStr, count: 1 });
    if (insertError) throw new Error("利用回数記録中にエラーが発生しました");
    return;
  } else {
    if (usage.date === todayStr) {
      if (usage.count >= limit) {
        throw new Error("本日の利用回数上限（10回）に達しました");
      }
      const { error: updateError } = await supabase
        .from("api_usage")
        .update({ count: usage.count + 1 })
        .eq("user_id", userId);
      if (updateError) throw new Error("利用回数更新中にエラーが発生しました");
      return;
    } else {
      const { error: resetError } = await supabase
        .from("api_usage")
        .update({ date: todayStr, count: 1 })
        .eq("user_id", userId);
      if (resetError)
        throw new Error("利用回数リセット中にエラーが発生しました");
      return;
    }
  }
}
