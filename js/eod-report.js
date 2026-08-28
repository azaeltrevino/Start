// EOD Report generator — builds a plain-text summary the media buyer can copy/paste

(function () {
  const form = document.getElementById('eodForm');
  const output = document.getElementById('eodOutput');
  const reportText = document.getElementById('reportText');
  const copyBtn = document.getElementById('copyBtn');
  const copyConfirm = document.getElementById('copyConfirm');
  const resetBtn = document.getElementById('resetBtn');
  const dateInput = document.getElementById('reportDate');
  const buyerNameInput = document.getElementById('buyerName');

  if (!form) return;

  // Default date to today
  const today = new Date();
  dateInput.value = today.toISOString().slice(0, 10);

  // Remember the buyer's name between visits
  const savedName = localStorage.getItem('eod_buyerName');
  if (savedName) buyerNameInput.value = savedName;

  function money(n) {
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatDate(value) {
    if (!value) return '';
    const [y, m, d] = value.split('-');
    return `${m}/${d}/${y}`;
  }

  function buildReport(data) {
    const lines = [];
    lines.push(`EOD REPORT — ${formatDate(data.reportDate)}`);
    lines.push(`Media Buyer: ${data.buyerName}`);
    if (data.clientName) lines.push(`Client/Account: ${data.clientName}`);
    if (data.platform) lines.push(`Platform: ${data.platform}`);

    const spend = parseFloat(data.adSpend);
    const leads = parseInt(data.leads, 10);
    const impressions = parseInt(data.impressions, 10);
    const clicks = parseInt(data.clicks, 10);
    const hasSpend = !isNaN(spend);
    const hasLeads = !isNaN(leads);
    const hasImpressions = !isNaN(impressions);
    const hasClicks = !isNaN(clicks);

    if (hasSpend || hasLeads || hasImpressions || hasClicks) {
      lines.push('');
      lines.push('SPEND & RESULTS');
      if (hasSpend) lines.push(`Ad Spend: ${money(spend)}`);
      if (hasLeads) lines.push(`Leads: ${leads}`);
      if (hasSpend && hasLeads && leads > 0) lines.push(`Cost/Lead: ${money(spend / leads)}`);
      if (hasImpressions) lines.push(`Impressions: ${impressions.toLocaleString('en-US')}`);
      if (hasClicks) lines.push(`Clicks: ${clicks.toLocaleString('en-US')}`);
      if (hasImpressions && hasClicks && impressions > 0) {
        lines.push(`CTR: ${((clicks / impressions) * 100).toFixed(2)}%`);
      }
    }

    if (data.campaignChanges) {
      lines.push('');
      lines.push('CAMPAIGN CHANGES TODAY');
      lines.push(data.campaignChanges.trim());
    }

    if (data.wins) {
      lines.push('');
      lines.push("WINS / WHAT'S WORKING");
      lines.push(data.wins.trim());
    }

    if (data.issues) {
      lines.push('');
      lines.push('ISSUES / BLOCKERS');
      lines.push(data.issues.trim());
    }

    if (data.planTomorrow) {
      lines.push('');
      lines.push('PLAN FOR TOMORROW');
      lines.push(data.planTomorrow.trim());
    }

    return lines.join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    localStorage.setItem('eod_buyerName', buyerNameInput.value.trim());

    const data = Object.fromEntries(new FormData(form).entries());
    reportText.value = buildReport(data);
    output.hidden = false;
    copyConfirm.hidden = true;
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  resetBtn.addEventListener('click', function () {
    form.reset();
    dateInput.value = new Date().toISOString().slice(0, 10);
    if (savedName) buyerNameInput.value = savedName;
    output.hidden = true;
    reportText.value = '';
  });

  copyBtn.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(reportText.value);
    } catch (err) {
      reportText.removeAttribute('readonly');
      reportText.focus();
      reportText.select();
      document.execCommand('copy');
      reportText.setAttribute('readonly', 'true');
    }
    copyConfirm.hidden = false;
    setTimeout(() => { copyConfirm.hidden = true; }, 2500);
  });
})();
