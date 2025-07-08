document.getElementById("searchButton").addEventListener("click", async () => {
  const searchName = document.getElementById("inputName").value.trim();
  const container = document.getElementById("userCardContainer");
  container.innerHTML = "";

  if (searchName === "") {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${searchName}`);
    if (!response.ok) throw new Error("User not found");
    const user = await response.json();
    const createdDate = new Date(user.created_at).toDateString();

    const cardHTML = `
      <div class="card">
        <div class="card-content">
          <img src="${user.avatar_url}" alt="${user.login}" />
          <h3>${user.name || user.login}</h3>
          <p><strong>Username:</strong> ${user.login}</p>
          <p><strong>Bio:</strong> ${user.bio || "Not available"}</p>
          <p><strong>Location:</strong> ${user.location || "Not available"}</p>
          <p><strong>Followers:</strong> ${user.followers}</p>
          <p><strong>Public Repos:</strong> ${user.public_repos}</p>
          <p><strong>Joined:</strong> ${createdDate}</p>
          ${
            user.blog
              ? `<p><strong>Website:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a></p>`
              : ""
          }
          <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
        </div>
      </div>
    `;
    container.innerHTML = cardHTML;
  } catch (error) {
    container.innerHTML = `<p style="color:white; background:red; padding:10px; border-radius:8px;">User not found or error occurred.</p>`;
  }
});
