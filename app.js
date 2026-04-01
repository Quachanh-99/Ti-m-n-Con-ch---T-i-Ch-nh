import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHrNHMod5jy3fV1GGNskQ9kBajTrRYPXM",
  authDomain: "ech-economy.firebaseapp.com",
  projectId: "ech-economy",
  storageBucket: "ech-economy.firebasestorage.app",
  messagingSenderId: "165740373358",
  appId: "1:165740373358:web:128def43d46511bd07cd7f",
  measurementId: "G-7N7WL2Q13C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "transactions");
let data = [];
let partners = [];

async function addIncome() {
  const name = prompt('Tên khoản thu');
  const money = +prompt('Số tiền');
  if(!name || !money) return;

  await addDoc(colRef, {
    type:'income',
    name,
    money
  });
}

async function addIncome() {
  const name = prompt('Tên khoản thu');
  const money = +prompt('Số tiền');
  if(!name || !money) return;

  await addDoc(colRef, {
    type:'income',
    name,
    money
  });
}

async function addExpense() {
  const name = prompt('Tên khoản chi');
  const money = +prompt('Số tiền');
  if(!name || !money) return;

  await addDoc(colRef, {
    type:'expense',
    name,
    money
  });
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
onSnapshot(colRef, (snapshot) => {
  data = [];
  snapshot.forEach(doc => {
    data.push(doc.data());
  });
  render();
});