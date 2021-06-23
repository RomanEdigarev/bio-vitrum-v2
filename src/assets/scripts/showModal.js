const useShowModal = (targetId, modalId) => {
  const target = document.getElementById(targetId);
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(`${modalId}-close-btn`);

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    document.body.style.overflow = "visible";
  });

  target.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    modal.style.display = "block";
  });
};

useShowModal("headerLeftLink", "message");
