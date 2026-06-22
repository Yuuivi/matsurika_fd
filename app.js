const KEY_PREFIX = 'mkfd-guide-pink-done:';
document.querySelectorAll('input[type="checkbox"][data-key]').forEach(cb => {
  const key = KEY_PREFIX + cb.dataset.key;
  cb.checked = localStorage.getItem(key) === '1';
  cb.addEventListener('change', () => {
    if (cb.checked) localStorage.setItem(key, '1');
    else localStorage.removeItem(key);
  });
});

const search = document.getElementById('search');
function filterRows(){
  const q = (search.value || '').trim().toLowerCase();
  document.querySelectorAll('tbody tr').forEach(tr => {
    tr.classList.toggle('hidden', !!q && !tr.dataset.text.includes(q));
  });
  document.querySelectorAll('.route').forEach(route => {
    const visible = [...route.querySelectorAll('tbody tr')].some(tr => !tr.classList.contains('hidden'));
    route.classList.toggle('hidden', !!q && !visible);
  });
}
search.addEventListener('input', filterRows);

const toggle = document.getElementById('toggle-cn');
const cnHidden = localStorage.getItem('mkfd-guide-cn-hidden') === '1';
if (cnHidden) document.body.classList.add('cn-hidden');
function syncToggle(){ toggle.textContent = document.body.classList.contains('cn-hidden') ? '显示中文辅助' : '隐藏中文辅助'; }
syncToggle();
toggle.addEventListener('click', () => {
  document.body.classList.toggle('cn-hidden');
  localStorage.setItem('mkfd-guide-cn-hidden', document.body.classList.contains('cn-hidden') ? '1' : '0');
  syncToggle();
});
