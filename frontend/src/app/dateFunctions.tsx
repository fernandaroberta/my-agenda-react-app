const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function getToday(): string {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const date = today.getDate().toString().padStart(2, "0");
  return `${today.getFullYear()}-${month}-${date}`;
}

export function formatMonth(isoMonth: string): string {
  const [year, month] = isoMonth.split("-");
  return `${MONTHS[parseInt(month) - 1]}  de ${year}`;
}

export function addMonths(isoMonth: string, increment: number): string {
  const jsDate = new Date(`${isoMonth}-01T12:00:00`);
  jsDate.setMonth(jsDate.getMonth() + increment);
  const monthStr = (jsDate.getMonth() + 1).toString().padStart(2, "0");
  return `${jsDate.getFullYear()}-${monthStr}`;
}
