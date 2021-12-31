$(document).ready(function(){
    $(document).on("click", ".accordion-head", function () {
        $(".accordion-body").slideUp();
        $(this).next().slideToggle();
      });
})