let data = [];
let partners = [];

function showTab(tab) {
  ['report','transaction','partner','store'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(tab).classList.remove('hidden');
}

function addIncome() {
  const name = prompt('Tên khoản thu');
  const money = +prompt('Số tiền');
  if(!name || !money) return;
  data.push({type:'income', name, money});
  render();
}

function addExpense() {
  const name = prompt('Tên khoản chi');
  const money = +prompt('Số tiền');
  if(!name || !money) return;
  data.push({type:'expense', name, money});
  render();
}

function render() {
  let income = 0;
  let expense = 0;

  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach(d => {
    const div = document.createElement('div');
    div.className = 'row';

    if(d.type==='income') income += d.money;
    else expense += d.money;

    div.innerHTML = `
      <div>${d.name}</div>
      <div class="${d.type==='income'?'green':'red'}">${d.money}</div>
    `;

    list.appendChild(div);
  });

  document.getElementById('totalIncome').innerText = income;
  document.getElementById('totalExpense').innerText = expense;
}

function addPartner() {
  const name = document.getElementById('partnerName').value;
  if(!name) return;
  partners.push(name);
  renderPartner();
}

function renderPartner() {
  const list = document.getElementById('partnerList');
  list.innerHTML = '';
  partners.forEach(p => {
    const div = document.createElement('div');
    div.innerText = p;
    list.appendChild(div);
  });
}

function saveStore() {
  const name = document.getElementById('storeInput').value;
  if(!name) return;
  document.getElementById('storeName').innerText = name;
}