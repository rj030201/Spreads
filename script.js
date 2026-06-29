const defaultRows = [
  { name: "Avery Reed", email: "avery@marketco.com", company: "MarketCo", role: "Project Lead" },
  { name: "Jules Park", email: "jules@designhub.io", company: "DesignHub", role: "UX Designer" },
  { name: "Mina Chen", email: "mina@fintech.ai", company: "FinTech AI", role: "Data Analyst" }
];

const tableBody = document.querySelector("#data-table tbody");
const addRowButton = document.querySelector("#add-row-btn");
const searchInput = document.querySelector("#search-input");
const rowCount = document.querySelector("#row-count");

let rows = [...defaultRows];
let filterText = "";

function renderTable() {
  tableBody.innerHTML = "";

  const visibleRows = rows.filter(row => {
    const contents = [row.name, row.email, row.company, row.role].join(" ").toLowerCase();
    return contents.includes(filterText.toLowerCase());
  });

  visibleRows.forEach((row, index) => {
    const tr = document.createElement("tr");

    ["name", "email", "company", "role"].forEach(key => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.value = row[key];
      input.dataset.rowIndex = index;
      input.dataset.key = key;
      input.className = "editable-cell";
      input.addEventListener("input", handleCellEdit);
      td.appendChild(input);
      tr.appendChild(td);
    });

    const actionTd = document.createElement("td");
    actionTd.className = "action-cell";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "danger-btn";
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () => removeRow(index));
    actionTd.appendChild(deleteBtn);

    tr.appendChild(actionTd);
    tableBody.appendChild(tr);
  });

  rowCount.textContent = `${visibleRows.length} row${visibleRows.length === 1 ? "" : "s"}`;
}

function handleCellEdit(event) {
  const input = event.target;
  const rowIndex = Number(input.dataset.rowIndex);
  const key = input.dataset.key;

  if (rows[rowIndex]) {
    rows[rowIndex][key] = input.value;
  }
}

function addRow() {
  rows.push({ name: "New name", email: "email@example.com", company: "Company", role: "Role" });
  renderTable();
}

function removeRow(index) {
  rows.splice(index, 1);
  renderTable();
}

searchInput.addEventListener("input", event => {
  filterText = event.target.value;
  renderTable();
});

addRowButton.addEventListener("click", addRow);

renderTable();
