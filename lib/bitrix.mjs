/** Send a saved rental request to the Bitrix24 deals pipeline. */
export async function sendRentalToBitrix(webhook, request, fetchImpl = fetch) {
  if (!webhook) return { ok: false, reason: 'not_configured' };
  let base;
  try { base = new URL(webhook); } catch { return { ok: false, reason: 'invalid_configuration' }; }
  if (base.protocol !== 'https:' || base.hostname !== 'b24-8c16qf.bitrix24.ru' || base.username || base.password || base.search || base.hash || !/^\/rest\/\d+\/[a-zA-Z0-9]+\/?$/.test(base.pathname)) return { ok: false, reason: 'invalid_configuration' };
  base.pathname = base.pathname.replace(/\/$/, '') + '/crm.deal.add.json';
  const safe = (value) => String(value).replace(/[\[\]]/g, '').slice(0, 300);
  const comments = ['Учебная заявка Share&Rent', `Номер заявки: ${request.id}`, `Вещь: ${safe(request.title)}`, `Даты: ${safe(request.startDate)} — ${safe(request.endDate)}`, `Имя: ${safe(request.name)}`, `Почта: ${safe(request.email)}`].join('\n');
  try {
    const response = await fetchImpl(base.toString(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { TITLE: `Заявка Share&Rent №${request.id}: ${safe(request.title)}`, COMMENTS: comments, OPENED: 'N' } }), signal: AbortSignal.timeout(5000) });
    const data = await response.json();
    return response.ok && data.result ? { ok: true } : { ok: false, reason: 'crm_error' };
  } catch { return { ok: false, reason: 'connection_error' }; }
}
