document.querySelector(".confirmForm").addEventListener("submit", function() {
    document.querySelector("main").innerHTML = `
        <div class="thanks">
            <h2>Thank You!</h2>
            <p>Your order will arrive within 15-30 minutes.</p>
            <a href="../index.html" class="home-link">Back to Home</a>
        </div>
      `;
      window.localStorage.removeItem("myCart")
});