import { supabase } from "../utils/supabaseClient";
import { createTask } from "../types";

export async function listTasks(filters = {}) {
  let query = supabase.from("tasks").select("*").order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.priority) query = query.eq("priority", filters.priority);

  const { data, error } = await query;
  if (error) throw error;

  return data.map((row) => createTask(row));
}

export async function getTask(id) {
  const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single();
  if (error) throw error;
  return createTask(data);
}

export async function createNewTask(payload) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return createTask(data);
}

export async function updateTask(id, payload) {
  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return createTask(data);
}

export async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export async function markTaskCompleted(id) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: "done" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return createTask(data);
}
