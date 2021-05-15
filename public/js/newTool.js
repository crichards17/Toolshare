const newToolFormHandler = async (event) => {
    event.preventDefault();
    
    const tool_name = document.querySelector('#new_name').value.trim();
    const tool_description = document.querySelector('#new_description').value.trim();
    const asking = document.querySelector('#new_asking').value.trim();
    const tool_categories_id = document.querySelector('#new_category').value;
    const tool_type_id = document.querySelector('#new_type').value;
    const tool_make_id = document.querySelector('#new_make').value;
  
    if (tool_name && tool_description && asking && tool_make_id!=='default_label' && tool_type_id!=='default_label' && tool_categories_id!=='default_label') {
      const response = await fetch('/api/Tool/', {
        method: 'POST',
        body: JSON.stringify({ tool_name, tool_description, asking, tool_categories_id, tool_type_id, tool_make_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create new tool');
      }
    } else {
        console.log("Failed to create tool");
    }
  };
  
  document
    .querySelector('#submit_btn')
    .addEventListener('click', newToolFormHandler);