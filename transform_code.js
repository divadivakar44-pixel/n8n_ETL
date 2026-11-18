
const items = $input.all();

function cleanText(value) {
  return String(value ?? "").trim();
}

function titleCase(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/\b[a-z]/g, letter => letter.toUpperCase());
}

return items.map(item => {
  const row = item.json;

  return {
    json: {
      name: titleCase(row.name),
      email: cleanText(row.email).toLowerCase(),
      course: titleCase(row.course),
      status: cleanText(row.status).toLowerCase(),
      enrolled_date: cleanText(row.enrolled_date)
    }
  };
});
