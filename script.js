customElements.define(
  "comment-div",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = `
      <style>

      .comments {
        color:purple;
        font-style: italic;
        display:flexbox;
        width:100%;
        padding-bottom: 5px;
        }

      textarea {width: 50%}
          
      button {
        background-color: #ffa812;
        border: none;
        color: white;
        padding: 8px 35px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        }

      </style>
     
      <p></p>
      <br>
      <button id="submitBtn">Обсудить</button>
      <div class="comments"></div>
    `;
      shadowRoot.getElementById("submitBtn").addEventListener("click", () => {
        const comment = document.createElement("div");
        comment.className = "comment";
        const commentTemplate = document.getElementById("commentTemplate");
        const templ = commentTemplate.content.cloneNode(true);
        comment.appendChild(templ);

        shadowRoot.querySelector(".comments").appendChild(comment);

        this.setupListeners(comment);
        const submitBtn = shadowRoot.getElementById("submitBtn");
        console.log(submitBtn);
        submitBtn.style.display = "none";
      });
    }

    setupListeners(comment) {
      comment.querySelector(".like-btn").addEventListener("click", () => {
        const count = comment.querySelector(".like-count");
        count.textContent = parseInt(count.textContent) + 1;
      });

      comment.querySelector(".reply-btn").addEventListener("click", () => {
        const diveComments = comment.querySelector(".dive-comments");
        const br = document.createElement("br");
        const diveCommentInput = document.createElement("textarea");
        diveCommentInput.required = true;
        diveComments.appendChild(diveCommentInput);
        diveComments.appendChild(br);
        const diveSubmitBtn = document.createElement("button");
        diveSubmitBtn.textContent = "Отправить";
        diveComments.appendChild(diveSubmitBtn);
        diveSubmitBtn.addEventListener("click", () => {
          const diveComment = document.createElement("div");
          diveComment.className = "comment";
          const commentTemplate = document.getElementById("commentTemplate");
          const content = commentTemplate.content.cloneNode(true);
          diveComment.appendChild(content);
          diveComment.querySelector("slot").textContent =
            diveCommentInput.value;
          if (diveComment.querySelector("slot").textContent === "") {
            alert("Комментарий не может быть пустым");
          } else {
            diveComments.insertBefore(diveComment, diveCommentInput);
            diveCommentInput.remove();
            diveSubmitBtn.remove();
          }
          this.setupListeners(diveComment);
        });
      });

      comment.querySelector(".delete-btn").addEventListener("click", () => {
        comment.remove();
      });
    }
  }
);
