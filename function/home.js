const loadIssue = () => {

   fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => {
      displayIssue(json.data);
    });

};

const displayIssue = (issues) => {
    
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = "";

  for (let issue of issues) {
   
    const card = document.createElement("div");





  card.innerHTML = `
  <div class="bg-white rounded-2xl shadow-md p-5 border-t-4 hover:scale-105 transition">

    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      
      <!-- Icon -->
      <div class="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
        <span class=" text-xl"></span>
      </div>

      <!-- Priority -->
      <div class="px-4 py-1 rounded-full bg-red-100 text-red-500 font-semibold text-sm">
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

    <!-- Tags -->
    <div class="flex gap-3 mb-4">
      <span class="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-red-100 text-red-500 font-medium">
          ${issue.labels[0]}
      </span>
      <span class="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600 font-medium">
         ${issue.labels[1]}
      </span>
    </div>

    <!-- Divider -->
    <div class="border-t pt-3 text-sm text-gray-500">
      <p>#1 by ${issue.author }</p>
      <p>${issue.date}</p>
    </div>

  </div>
`;
    // card.className = 'bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer border-t-4 ' + (issue.status === 'open' ? 'border-green-500' : 'border-purple-500');
    issueContainer .appendChild(card);
  }

}

loadIssue();






