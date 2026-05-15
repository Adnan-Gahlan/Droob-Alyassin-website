
function initializeBookingPage() {
  console.log("تهيئة صفحة الحجز...");

  setupServiceSelection();


  setupFormNavigation();

  setupFormSubmission();

  setupAdditionalDetails();
}

function setupServiceSelection() {
  $(".service-option").click(function () {
    $(".service-option").removeClass("selected");

    $(this).addClass("selected");

    // تحديد زر الراديو
    $(this).find('input[type="radio"]').prop("checked", true);

    // إظهار التفاصيل الإضافية حسب الخدمة
    showServiceDetails($(this).data("service"));

    // إظهار رسالة تأكيد
    const serviceName = $(this).find("h5").text();
    showToast("تم اختيار خدمة: " + serviceName, "success");
  });
}

// إظهار التفاصيل الإضافية حسب الخدمة
function showServiceDetails(serviceType) {
  // إخفاء جميع التفاصيل الإضافية أولاً
  $("#serviceDetails").hide();
  $(".security-details").hide();
  $(".visa-details").hide();
  $("#otherVisaField").hide();

  // إظهار التفاصيل المناسبة حسب الخدمة
  if (serviceType === "security_approval") {
    $("#serviceDetails").show();
    $("#securityDetails").show();
    $("#visaDetails").hide();
  } else if (serviceType === "work_visa") {
    $("#serviceDetails").show();
    $("#securityDetails").hide();
    $("#visaDetails").show();
  }

  // إظهار حقل "أخرى" إذا اختار نوع فيزة "أخرى"
  if (serviceType === "work_visa") {
    $("#visaType").change(function () {
      if ($(this).val() === "other") {
        $("#otherVisaField").show();
      } else {
        $("#otherVisaField").hide();
      }
    });
  }
}

// إعداد التنقل بين الخطوات
function setupFormNavigation() {
  // زر التالي
  $(".btn-next").click(function () {
    const nextStep = $(this).data("next");
    const currentStep = $(this).closest(".form-step").attr("id");

    // التحقق من صحة البيانات في الخطوة الحالية
    if (validateStep(currentStep)) {
      // الانتقال للخطوة التالية
      navigateToStep(nextStep);

      // تحديث شريط التقدم
      updateProgressBar(nextStep);
    }
  });

  // زر السابق
  $(".btn-prev").click(function () {
    const prevStep = $(this).data("prev");
    navigateToStep(prevStep);

    // تحديث شريط التقدم
    updateProgressBar(prevStep);
  });
}

// التحقق من صحة البيانات في الخطوة
function validateStep(stepId) {
  let isValid = true;

  if (stepId === "step1") {
    // التحقق من اختيار خدمة
    if (!$('input[name="service"]:checked').val()) {
      showToast("يرجى اختيار خدمة من القائمة", "error");
      isValid = false;
    }
  } else if (stepId === "step2") {
    // التحقق من البيانات الأساسية
    const fullName = $("#fullName").val();
    const phone = $("#phone").val();

    if (!fullName) {
      $("#fullName").addClass("is-invalid");
      isValid = false;
    } else {
      $("#fullName").removeClass("is-invalid");
    }

    if (!phone || !validatePhone(phone)) {
      $("#phone").addClass("is-invalid");
      isValid = false;
    } else {
      $("#phone").removeClass("is-invalid");
    }

    const email = $("#email").val();
    if (email && !validateEmail(email)) {
      $("#email").addClass("is-invalid");
      isValid = false;
    } else {
      $("#email").removeClass("is-invalid");
    }

    if (!isValid) {
      showToast("يرجى ملء جميع الحقول المطلوبة بشكل صحيح", "error");
    }
  }

  return isValid;
}

// التنقل بين الخطوات
function navigateToStep(stepId) {
  // إخفاء جميع الخطوات
  $(".form-step").hide();
  // إظهار الخطوة المطلوبة
  $("#" + stepId).show();

  // تحديث الخطوات النشطة
  $(".progress-steps .step").removeClass("active");
  $('.progress-steps .step[data-step="' + stepId + '"]').addClass("active");

  // تحديث ملخص الحجز إذا كانت الخطوة 3
  if (stepId === "step3") {
    updateBookingSummary();
  }
}

// تحديث شريط التقدم
function updateProgressBar(stepId) {
  let progress = 0;

  switch (stepId) {
    case "step1":
      progress = 33;
      break;
    case "step2":
      progress = 66;
      break;
    case "step3":
      progress = 100;
      break;
  }

  $(".progress-bar").css("width", progress + "%");
  $(".progress-bar").attr("aria-valuenow", progress);
}

// تحديث ملخص الحجز
function updateBookingSummary() {
  // الخدمة المختارة
  const selectedService = $('input[name="service"]:checked').val();
  let serviceText = "";

  switch (selectedService) {
    case "passport":
      serviceText = "قطع جواز";
      break;
    case "hajj":
      serviceText = "حج";
      break;
    case "transaction":
      serviceText = "تخليص معاملة";
      break;
    case "family_visit":
      serviceText = "تخليص زيارة عائلية";
      break;
    case "security_approval":
      const country = $('input[name="country"]:checked').val();
      serviceText =
        "موافقات أمنية - " + (country === "egypt" ? "مصر" : "الأردن");
      break;
    case "tickets":
      serviceText = "حجز تذاكر سفر";
      break;
    case "work_visa":
      const visaType = $("#visaType").val();
      let visaText = "";
      switch (visaType) {
        case "private_driver":
          visaText = "سائق خاص";
          break;
        case "domestic_worker":
          visaText = "عامل منزلي";
          break;
        case "individual_establishment":
          visaText = "مؤسسة فردية";
          break;
        case "loader":
          visaText = "عامل تحميل وتنزيل";
          break;
        case "other":
          visaText = $("#otherVisaInput").val() || "أخرى";
          break;
      }
      serviceText = "فيزة عمل - " + visaText;
      break;
  }

  $("#summaryService").text(serviceText);

  // تفاصيل إضافية
  const additionalInfo = $("#additionalInfo").val();
  if (additionalInfo) {
    $("#summaryDetails").text(additionalInfo);
  }

  // معلومات العميل
  const fullName = $("#fullName").val();
  const bookingDate = $("#bookingDate").val();
  let customerText = fullName;
  if (bookingDate) {
    customerText += " - تاريخ الحجز: " + bookingDate;
  }
  $("#summaryCustomer").text(customerText);

  // معلومات التواصل
  const phone = $("#phone").val();
  const email = $("#email").val();
  let contactText = "هاتف: " + phone;
  if (email) {
    contactText += " - بريد: " + email;
  }
  $("#summaryContact").text(contactText);
}

// إعداد إرسال النموذج
function setupFormSubmission() {
  $("#bookingForm").submit(function (e) {
    e.preventDefault();

    // التحقق من صحة البيانات النهائية
    if (validateStep("step3")) {
      // إظهار رسالة التحميل
      showToast("جاري إرسال طلب الحجز...", "info");

      // محاكاة إرسال البيانات إلى الخادم
      setTimeout(function () {
        // إظهار رسالة النجاح
        showToast(
          "تم إرسال طلب الحجز بنجاح! سيتصل بك أحد ممثلينا خلال 24 ساعة.",
          "success",
        );

        // إعادة تعيين النموذج
        resetBookingForm();

        // الانتقال للخطوة الأولى
        navigateToStep("step1");
        updateProgressBar("step1");

        // إظهار رسالة تأكيد
        setTimeout(function () {
          showToast("شكراً لاختيارك مكتب دروب الياسين", "info");
        }, 2000);
      }, 2000);
    }
  });
}

// إعادة تعيين نموذج الحجز
function resetBookingForm() {
  $("#bookingForm")[0].reset();
  $(".service-option").removeClass("selected");
  $(".form-control").removeClass("is-invalid is-valid");
  $("#serviceDetails").hide();
}

// إعداد التفاصيل الإضافية
function setupAdditionalDetails() {
  // عند تغيير نوع الفيزة
  $("#visaType").change(function () {
    if ($(this).val() === "other") {
      $("#otherVisaField").show();
    } else {
      $("#otherVisaField").hide();
    }
  });
}

// دالة مساعدة: إظهار إشعار
function showToast(message, type) {
  switch (type) {
    case "success":
      toastr.success(message);
      break;
    case "error":
      toastr.error(message);
      break;
    case "info":
      toastr.info(message);
      break;
    case "warning":
      toastr.warning(message);
      break;
  }
}

// دالة مساعدة: التحقق من البريد الإلكتروني
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// دالة مساعدة: التحقق من رقم الهاتف
function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}
