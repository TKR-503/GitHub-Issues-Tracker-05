const loadIssue = (status = "all") => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => {
      let issues = json.data;

    

      displayIssue(issues);
    });
};




const displayIssue = (issues) => {
  const issueContainer = document.getElementById('issue-container');
  issueContainer.innerHTML = "";

  issues.forEach(issue => {

    const card = document.createElement("div");

   

    // Priority color
    let priorityColor = "bg-red-400 text-gray-500";
    if (issue.priority === "high") {
      priorityColor = "bg-red-100 text-red-500";
    } else if (issue.priority === "medium") {
      priorityColor = "bg-yellow-100 text-yellow-600";
    } else {
      priorityColor = "bg-purple-100 text-purple-500";
    }

    // Format date
    
    const date = new Date(issue.createdAt).toLocaleDateString();

    
  card.className = `
      bg-white p-4 rounded-xl shadow 
      hover:scale-105 transition cursor-pointer 
      border-t-4 
      ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}
    `;


    card.innerHTML = `
      

        <!-- Header -->
        <div class="flex justify-between items-start mb-4">
          
          <!-- Icon -->
          <div class="flex items-center justify-center rounded-full">
  <img src="./assets/${
    (issue.priority === 'high' || issue.priority === 'medium')
      ? 'Open-Status.png'
      : 'Closed-Status.png'
  }">
</div>

          <!-- Priority -->
          <div class="px-4 py-1 rounded-full ${priorityColor} font-semibold text-sm">
            ${issue.priority.toUpperCase()}
          </div>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-gray-800 mb-2">
          ${issue.title}
        </h3>

        <!-- Description -->
        <p class="text-gray-500 text-sm mb-4">
          ${issue.description.slice(0, 80)}...
        </p>

        <!-- Labels -->
        <div class="flex flex-wrap gap-2 mb-4">
  ${issue.labels.map(label => {

    let style = "bg-yellow-100 text-yellow-600";

    if (label === "bug") {
      style = "bg-red-100 text-red-600";
    } 
    else if (label === "help wanted") {
      style = "bg-yellow-100 text-yellow-600";
    } 
    else if (label === "enhancement") {
      style = "bg-green-100 text-green-600";
    }

    return `
      <span class="px-3 py-1 text-sm rounded-full ${style}">
        ${label}
      </span>
    `;
    
  }).join("")}
</div>

        <!-- Footer -->
        <div class="border-t pt-3 text-sm text-gray-500">
          <p>#${issue.id} by ${issue.author}</p>
          <p>${date}</p>
        </div>

      </div>
    `;

    issueContainer.appendChild(card);
  });
};


// ✅ Tab switching
function setTab(tab) {
  current = tab;

  document.querySelectorAll('.tab').forEach(t =>
    t.classList.remove('bg-indigo-600', 'text-white')
  );

  document.getElementById(tab + 'Tab')
    .classList.add('bg-indigo-600', 'text-white');

  
}

loadIssue();






