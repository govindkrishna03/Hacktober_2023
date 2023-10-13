$('.card-text-wrapper').click(function() {
    clickToExapndCards($(this));
  });
  
  function clickToExapndCards($obj){
    var clickedElement = $obj;
    if (clickedElement.hasClass('expanded')) {
      clickedElement.find('.card-text').hide('slow');
      clickedElement.removeClass('expanded');
    } else {
       clickedElement.find('.card-text').show('slow');
      clickedElement.addClass('expanded');
    }
    
  };