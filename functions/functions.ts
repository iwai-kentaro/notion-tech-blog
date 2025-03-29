export const dateFormat = (
  dateString: string | undefined
): string | undefined => {
  if (!dateString) return undefined;

  // 日付部分だけを抽出する
  const datePart = dateString.split("T")[0]; // "2023-01-01T00:00:00Z" → "2023-01-01"

  // 日付オブジェクトを作成する（タイムゾーンの影響を受けない）
  const date = new Date(`${datePart}T00:00:00`);

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
