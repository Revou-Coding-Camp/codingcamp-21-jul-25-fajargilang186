document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua elemen yang dibutuhkan
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const todoBody = document.getElementById("todo-body");
  const filter = document.getElementById("filter");
  const deleteAllBtn = document.getElementById("delete-all");

  // Fungsi menampilkan "No task found" jika kosong
  function updateEmptyMessage() {
    if (todoBody.children.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `
        <td colspan="4" class="no-task">No task found</td>
      `;
      todoBody.appendChild(emptyRow);
    }
  }

  updateEmptyMessage(); // Tampilkan saat awal

  // Fungsi tambah todo
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = todoInput.value.trim();
    const date = todoDate.value;

    if (!task || !date) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task}</td>
      <td>${date}</td>
      <td class="status">Pending</td>
      <td>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">🗑️</button>
      </td>
    `;

    // Hapus baris "No task found" kalau ada
    const firstRow = todoBody.querySelector(".no-task");
    if (firstRow) firstRow.remove();

    todoBody.appendChild(row);
    todoInput.value = "";
    todoDate.value = "";
  });

  // Checklist & Delete
  todoBody.addEventListener("click", (e) => {
    const target = e.target;

    // Checklist
    if (target.classList.contains("complete-btn")) {
      const statusCell = target.closest("tr").querySelector(".status");
      statusCell.textContent = "Completed";
    }

    // Delete satu task
    if (target.classList.contains("delete-btn")) {
      const row = target.closest("tr");
      row.remove();
      updateEmptyMessage();
    }
  });

  // Delete semua task
  deleteAllBtn.addEventListener("click", () => {
    todoBody.innerHTML = "";
    updateEmptyMessage();
  });

  // Filter task
  filter.addEventListener("change", () => {
    const value = filter.value.toLowerCase(); // "all", "completed", "pending"

    Array.from(todoBody.children).forEach((row) => {
      const status = row.querySelector(".status");
      if (!status) return;

      if (value === "all") {
        row.style.display = "";
      } else if (status.textContent.toLowerCase() !== value) {
        row.style.display = "none";
      } else {
        row.style.display = "";
      }
    });
  });
});
