document.addEventListener("DOMContentLoaded", () => {
    // 1. Set current timestamp on form load
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // 2. Modal open/close handling
    const openBtns = document.querySelectorAll(".open-modal-btn");
    const closeBtns = document.querySelectorAll(".close-modal-btn");

    openBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });
});