const loadIssue = (status = "all") => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => {
      let issues = json.data;
     displayIssue(issues);
    });
};

const loadModal = (id) => {
  const modal = document.getElementById("my_modal_5");
  const content = document.getElementById("modal-content");

  content.innerHTML = "Loading...";

  if (modal.open) {
    modal.close();
  }

  modal.showModal();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res => res.json())
    .then(data => showModal(data.data))
    .catch(() => {
      content.innerHTML = "Failed to load data";
    });
};

const displayIssue = (issues) => {
  const issueContainer = document.getElementById('issue-container');
  issueContainer.innerHTML = "";

  issues.forEach(issue => {

    const card = document.createElement("div");
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
  bg-white p-4 sm:p-5 rounded-xl shadow 
  border-t-4 
  ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}
  
  transform transition-all duration-300 ease-in-out
  
  hover:scale-105 hover:shadow-lg   /* desktop */
  active:scale-95                   /* mobile tap */
  
  w-full
`;
card.innerHTML = `
  <div class="">

    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      
      <!-- Icon -->
      <div class="flex items-center justify-center rounded-full">
        <img class="pointer-events-none" src="./assets/${
          (issue.status === 'open')
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
    <h3 class="text-lg font-bold text-gray-800 mb-2 mt-3">
      ${issue.title}
    </h3>

    <!-- Description -->
    <p class="text-gray-500 text-sm mb-5">
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
            ${label.toUpperCase()}
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
card.style.cursor = "pointer";
 card.addEventListener("click", () => loadModal(issue.id));
    issueContainer.appendChild(card);
  });
};



const showModal = (issue) => {

  const content = document.getElementById("modal-content");
  const date = new Date(issue.createdAt).toLocaleString();

  // priority color logic
  let priorityColor = "bg-gray-100 text-gray-500";
  if (issue.priority === "high") {
    priorityColor = "bg-red-200 text-red-500";
  } else if (issue.priority === "medium") {
    priorityColor = "bg-yellow-200 text-yellow-600";
  } else {
    priorityColor = "bg-purple-200 text-purple-500";
  }

  content.innerHTML = `
      
    <!-- Title -->
      <h1 class="text-xl font-bold text-gray-800 mb-2 mt-3">
        ${issue.title}
      </h1>
    

    <p class="inline-block mt-1 mb-3 px-3 py-1 text-sm font-medium rounded-full border ${
      issue.status === "open"
        ? "text-white border bg-green-500"
        : "text-white border bg-purple-500"
    }">
      ${issue.status.toUpperCase()}
    </p>
   

    <!-- Full Description (not sliced) -->
      <p class="text-gray-500 text-sm mb-5">
        ${issue.description}
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
              ${label.toUpperCase()}
            </span>
            
          `;
        }).join("")}
      </div>

      <!-- Footer -->

     <div class="bg-gray-100  p-5 text-lg flex justify-between items-center gap-4">
  
 <div>
    <span class="text-gray-500 text-sm">Assignee:</span>
    <p class="font-semibold text-black">
      ${issue.author.toUpperCase()}
    </p>
  </div>


 <div class="flex flex-col items-end">

  <span class="text-gray-500 text-sm mb-1 mr-3">
    Priority:
  </span>

  <div class="px-4 py-1 rounded-full ${priorityColor} font-semibold text-sm">
    ${issue.priority.toUpperCase()}
  </div>

</div>

</div>
  
    
  `;
};
//  Tab switching

function setTab(tab) {
  current = tab;

  document.querySelectorAll('.tab').forEach(t =>
    t.classList.remove('bg-indigo-600', 'text-white')
  );

  document.getElementById(tab + 'Tab')
    .classList.add('bg-indigo-600', 'text-white');

  loadIssue(tab); 
}

loadIssue();