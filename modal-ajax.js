
$(document).ready(function () {
  $("#loadModalBtn").click(function () {
    $.ajax({
      url: "modals/special-offer.html",
      method: "post",
      beforeSend: function () {
        $("#dynamicModalContainer").html(
          '<div class="text-center p-5"><div class="loading"></div></div>',
        );
      },
      success: function (data) {
        $("#dynamicModalContainer").html(data);
        $("#specialOfferModal").modal("show");

        toastr.info("تم تحميل العرض الخاص", "عرض مميز");
      },
      error: function () {
        toastr.error("حدث خطأ في تحميل العرض", "خطأ");
      },
    });
  });
  $(".service-details-btn").click(function () {
    let serviceId = $(this).data("service-id");

    $.ajax({
      url: "modals/service-details.php",
      method: "POST",
      data: { service_id: serviceId },
      success: function (data) {
        $("#dynamicModalContainer").html(data);
        $("#serviceModal").modal("show");
      },
      error: function () {
        toastr.error("لا يمكن تحميل تفاصيل الخدمة حالياً", "خطأ");
      },
    });
  });
});
