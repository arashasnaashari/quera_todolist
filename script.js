const card_row = document.querySelector(".card_row");
const title_input = document.querySelector(".input_title");
const desc_input = document.querySelector(".input_desc");
const btn_add = document.querySelector(".btn_add");
const modal = document.querySelector(".modal");
const title_input_update = document.querySelector(".input_title_update");
const desc_input_update = document.querySelector(".input_desc_update");
const btn_update = document.querySelector(".btn_update");
const alert_erorr = document.querySelector(".alert_erorr");
const alert_success = document.querySelector(".alert_success");
const ix = document.querySelector(".ix");
const ix_1 = document.querySelector(".ix_1");

let cards = [];

if (JSON.parse(localStorage.getItem("cards"))) {
  cards = JSON.parse(localStorage.getItem("cards"));
  reRender();
} else {
  console.log("there is no cards");
}

btn_add.addEventListener("click", () => {
  let id = Math.floor(Math.random() * 300) + 1;
  let newCards = {
    title: title_input.value,
    desc: desc_input.value,
    isdone: false,
    id: `${desc_input.value.split(" ").join("")}_${desc_input.value
      .split(" ")
      .join("")}_${id}`,
  };

  if (!title_input.value || !desc_input.value) {
    showAlertNotFull();
  } else {
    cards.push(newCards);
    localStorage.setItem("cards", JSON.stringify(cards));
    showSuccess();
    title_input.value = "";
    desc_input.value = "";
    reRender();
  }
});
function reRender() {
  card_row.innerHTML = "";

  JSON.parse(localStorage.getItem("cards")).map((e) => {
    if (e.isdone) {
      card_row.insertAdjacentHTML(
        "beforeend",
        `<div class="card" data-id="${e.id}" data-isdone="${e.isdone}"> <header class="card_head"> <h1>${e.title}</h1> <h1 class="isdone_chek" id="${e.id}">✅</h1> </header> <p>${e.desc}</p> <footer class="card_footer"> <button class="btn_delete" onClick="remove(this)">delete</button> <button class="btn_edit" onClick="edit(this)">edit</button> <button class="btn_done" onClick="done(this)">done</button> </footer> </div>`
      );
    } else {
      card_row.insertAdjacentHTML(
        "beforeend",
        `<div class="card" data-id="${e.id}" data-isdone="${e.isdone}"> <header class="card_head"> <h1>${e.title}</h1> <h1 class="isdone_chek" id="${e.id}"></h1> </header> <p>${e.desc}</p> <footer class="card_footer"> <button class="btn_delete" onClick="remove(this)">delete</button> <button class="btn_edit" onClick="edit(this)">edit</button> <button class="btn_done" onClick="done(this)">doing</button> </footer> </div>`
      );
    }
  });
}
function showAlertNotFull() {
  alert_erorr.style.display = "flex";
  setTimeout(() => {
    alert_erorr.style.display = "none";
  }, 3000);
}
function showSuccess() {
  alert_success.style.display = "flex";

  setTimeout(() => {
    alert_success.style.display = "none";
  }, 3000);
}
function remove(e) {
  cards = cards.filter(
    (c) => c.id !== e.parentElement.parentElement.dataset.id
  );
  localStorage.setItem("cards", JSON.stringify(cards));
  reRender();
}
function edit(e) {
  modal.style.display = "block";

  let card_choose = cards.find(
    (c) => c.id == e.parentElement.parentElement.dataset.id
  );

  title_input_update.value = card_choose.title;
  desc_input_update.value = card_choose.desc;

  btn_update.addEventListener("click", (e) => {
    if (!title_input_update.value || !desc_input_update.value) {
      showAlertNotFull();
    } else {
      cards.map((c) => {
        if (c.id == card_choose.id) {
          c.title = title_input_update.value;
          c.desc = desc_input_update.value;
        }
      });
      showSuccess();
      localStorage.setItem("cards", JSON.stringify(cards));
      reRender();
      modal.style.display = "none";
    }
  });
}
function done(e) {
  let cardState = cards.find(
    (c) => c.id == e.parentElement.parentElement.dataset.id
  );

  if (cardState.isdone) {
    e.innerHTML = "doing";
    cardState.isdone = false;
    document.querySelector(
      `#${e.parentElement.parentElement.dataset.id}`
    ).innerHTML = "";
    localStorage.setItem("cards", JSON.stringify(cards));
  } else {
    e.innerHTML = "done";
    cardState.isdone = true;
    document.querySelector(
      `#${e.parentElement.parentElement.dataset.id}`
    ).innerHTML = "✅";
    localStorage.setItem("cards", JSON.stringify(cards));
  }
}
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  } else if (e.target == ix) {
    alert_erorr.style.display = "none";
  } else if (e.target == ix_1) {
    alert_success.style.display = "none";
  }
};
