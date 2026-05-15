
$(document).ready(function () {
  console.log("🔍 تهيئة نظام التحقق من النماذج...");

  initializeFormValidation();

  setupRealTimeValidation();
});

function initializeFormValidation() {
  console.log("📋 جاري تهيئة التحقق من النماذج...");

  if ($("#loginForm").length) {
    $("#loginForm").submit(function (e) {
      e.preventDefault();
      return validateLoginForm();
    });
    console.log("✅ تم تهيئة التحقق من نموذج تسجيل الدخول");
  }
  if ($("#registerForm").length) {
    $("#registerForm").submit(function (e) {
      e.preventDefault();
      return validateRegisterForm();
    });
    console.log("✅ تم تهيئة التحقق من نموذج إنشاء حساب");
  }
  if ($("#contactForm").length) {
    $("#contactForm").submit(function (e) {
      e.preventDefault();
      return validateContactForm();
    });
    console.log("✅ تم تهيئة التحقق من نموذج الاتصال");
  }
  if ($("#bookingForm").length) {
    $("#bookingForm").submit(function (e) {
      e.preventDefault();
      return validateBookingForm();
    });
    console.log("✅ تم تهيئة التحقق من نموذج الحجز");
  }
}
function setupRealTimeValidation() {
  $('input[type="email"]').on("input", function () {
    validateEmailField($(this));
  });

  $('input[type="tel"]').on("input", function () {
    validatePhoneField($(this));
  });
  $('input[type="password"]').on("input", function () {
    validatePasswordField($(this));
  });

  $("input[required], textarea[required], select[required]").blur(function () {
    validateRequiredField($(this));
  });
}
function validateLoginForm() {
  console.log("🔐 التحقق من نموذج تسجيل الدخول...");

  let isValid = true;
  const errors = [];
  const email = $("#loginEmail").val().trim();
  const password = $("#loginPassword").val();

  if (!email) {
    errors.push("البريد الإلكتروني مطلوب");
    $("#loginEmail").addClass("is-invalid");
    isValid = false;
  } else if (!validateEmail(email)) {
    errors.push("البريد الإلكتروني غير صالح");
    $("#loginEmail").addClass("is-invalid");
    isValid = false;
  } else {
    $("#loginEmail").removeClass("is-invalid").addClass("is-valid");
  }
  if (!password) {
    errors.push("كلمة المرور مطلوبة");
    $("#loginPassword").addClass("is-invalid");
    isValid = false;
  } else if (password.length < 6) {
    errors.push("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    $("#loginPassword").addClass("is-invalid");
    isValid = false;
  } else {
    $("#loginPassword").removeClass("is-invalid").addClass("is-valid");
  }

  if (isValid) {
    console.log("✅ نموذج تسجيل الدخول صالح");
    showFormSuccess("loginForm", "جاري تسجيل الدخول...");

    simulateLogin(email);

    return true;
  } else {
    console.log("❌ أخطاء في نموذج تسجيل الدخول:", errors);
    showFormErrors("loginForm", errors);
    return false;
  }
}
function validateRegisterForm() {
  console.log("👤 التحقق من نموذج إنشاء حساب...");

  let isValid = true;
  const errors = [];

  const fullName = $("#registerName").val().trim();
  const email = $("#registerEmail").val().trim();
  const phone = $("#registerPhone").val().trim();
  const password = $("#registerPassword").val();
  const confirmPassword = $("#registerConfirmPassword").val();

  if (!fullName) {
    errors.push("الاسم الكامل مطلوب");
    $("#registerName").addClass("is-invalid");
    isValid = false;
  } else if (fullName.length < 3) {
    errors.push("الاسم يجب أن يكون 3 أحرف على الأقل");
    $("#registerName").addClass("is-invalid");
    isValid = false;
  } else {
    $("#registerName").removeClass("is-invalid").addClass("is-valid");
  }
  if (!email) {
    errors.push("البريد الإلكتروني مطلوب");
    $("#registerEmail").addClass("is-invalid");
    isValid = false;
  } else if (!validateEmail(email)) {
    errors.push("البريد الإلكتروني غير صالح");
    $("#registerEmail").addClass("is-invalid");
    isValid = false;
  } else {
    $("#registerEmail").removeClass("is-invalid").addClass("is-valid");
  }

  if (!phone) {
    errors.push("رقم الهاتف مطلوب");
    $("#registerPhone").addClass("is-invalid");
    isValid = false;
  } else if (!validatePhone(phone)) {
    errors.push("رقم الهاتف يجب أن يكون 9 أرقام");
    $("#registerPhone").addClass("is-invalid");
    isValid = false;
  } else {
    $("#registerPhone").removeClass("is-invalid").addClass("is-valid");
  }
  if (!password) {
    errors.push("كلمة المرور مطلوبة");
    $("#registerPassword").addClass("is-invalid");
    isValid = false;
  } else if (password.length < 6) {
    errors.push("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    $("#registerPassword").addClass("is-invalid");
    isValid = false;
  } else if (!validatePasswordStrength(password)) {
    errors.push("كلمة المرور ضعيفة، يجب أن تحتوي على أحرف وأرقام");
    $("#registerPassword").addClass("is-invalid");
    isValid = false;
  } else {
    $("#registerPassword").removeClass("is-invalid").addClass("is-valid");
  }
  if (!confirmPassword) {
    errors.push("تأكيد كلمة المرور مطلوب");
    $("#registerConfirmPassword").addClass("is-invalid");
    isValid = false;
  } else if (password !== confirmPassword) {
    errors.push("كلمات المرور غير متطابقة");
    $("#registerConfirmPassword").addClass("is-invalid");
    isValid = false;
  } else {
    $("#registerConfirmPassword")
      .removeClass("is-invalid")
      .addClass("is-valid");
  }

  if (isValid) {
    console.log("✅ نموذج إنشاء حساب صالح");
    showFormSuccess("registerForm", "جاري إنشاء حسابك...");

    simulateRegistration(fullName, email, phone);

    return true;
  } else {
    console.log("❌ أخطاء في نموذج إنشاء حساب:", errors);
    showFormErrors("registerForm", errors);
    return false;
  }
}
function validateContactForm() {
  console.log("📞 التحقق من نموذج الاتصال...");

  let isValid = true;
  const errors = [];
  const name = $("#contactName").val().trim();
  const email = $("#contactEmail").val().trim();
  const phone = $("#contactPhone").val().trim();
  const subject = $("#contactSubject").val();
  const message = $("#contactMessage").val().trim();

  if (!name) {
    errors.push("الاسم مطلوب");
    $("#contactName").addClass("is-invalid");
    isValid = false;
  } else if (name.length < 2) {
    errors.push("الاسم يجب أن يكون حرفين على الأقل");
    $("#contactName").addClass("is-invalid");
    isValid = false;
  } else {
    $("#contactName").removeClass("is-invalid").addClass("is-valid");
  }
  if (!email) {
    errors.push("البريد الإلكتروني مطلوب");
    $("#contactEmail").addClass("is-invalid");
    isValid = false;
  } else if (!validateEmail(email)) {
    errors.push("البريد الإلكتروني غير صالح");
    $("#contactEmail").addClass("is-invalid");
    isValid = false;
  } else {
    $("#contactEmail").removeClass("is-invalid").addClass("is-valid");
  }

  if (!phone) {
    errors.push("رقم الهاتف مطلوب");
    $("#contactPhone").addClass("is-invalid");
    isValid = false;
  } else if (!validatePhone(phone)) {
    errors.push("رقم الهاتف غير صالح");
    $("#contactPhone").addClass("is-invalid");
    isValid = false;
  } else {
    $("#contactPhone").removeClass("is-invalid").addClass("is-valid");
  }

  if (!subject) {
    errors.push("الموضوع مطلوب");
    $("#contactSubject").addClass("is-invalid");
    isValid = false;
  } else {
    $("#contactSubject").removeClass("is-invalid").addClass("is-valid");
  }

  if (!message) {
    errors.push("الرسالة مطلوبة");
    $("#contactMessage").addClass("is-invalid");
    isValid = false;
  } else if (message.length < 10) {
    errors.push("الرسالة يجب أن تكون 10 أحرف على الأقل");
    $("#contactMessage").addClass("is-invalid");
    isValid = false;
  } else {
    $("#contactMessage").removeClass("is-invalid").addClass("is-valid");
  }

  if (isValid) {
    console.log("✅ نموذج الاتصال صالح");
    showFormSuccess("contactForm", "جاري إرسال رسالتك...");

    simulateMessageSend(name, email, subject);

    return true;
  } else {
    console.log("❌ أخطاء في نموذج الاتصال:", errors);
    showFormErrors("contactForm", errors);
    return false;
  }
}

function validateBookingForm() {
  console.log("📅 التحقق من نموذج الحجز...");

  let isValid = true;
  const errors = [];
  const selectedService = $('input[name="service"]:checked').val();
  if (!selectedService) {
    errors.push("يرجى اختيار خدمة من القائمة");
    isValid = false;
  }
  const fullName = $("#fullName").val().trim();
  const phone = $("#phone").val().trim();

  if (!fullName) {
    errors.push("الاسم الكامل مطلوب");
    $("#fullName").addClass("is-invalid");
    isValid = false;
  } else {
    $("#fullName").removeClass("is-invalid").addClass("is-valid");
  }

  if (!phone) {
    errors.push("رقم الهاتف مطلوب");
    $("#phone").addClass("is-invalid");
    isValid = false;
  } else if (!validatePhone(phone)) {
    errors.push("رقم الهاتف غير صالح");
    $("#phone").addClass("is-invalid");
    isValid = false;
  } else {
    $("#phone").removeClass("is-invalid").addClass("is-valid");
  }

  // التحقق من البريد الإلكتروني إذا تم إدخاله
  const email = $("#email").val().trim();
  if (email && !validateEmail(email)) {
    errors.push("البريد الإلكتروني غير صالح");
    $("#email").addClass("is-invalid");
    isValid = false;
  } else if (email) {
    $("#email").removeClass("is-invalid").addClass("is-valid");
  }

  // التحقق الإضافي حسب نوع الخدمة
  if (selectedService === "security_approval") {
    const country = $('input[name="country"]:checked').val();
    if (!country) {
      errors.push("يرجى اختيار البلد للموافقات الأمنية");
      isValid = false;
    }
  } else if (selectedService === "work_visa") {
    const visaType = $("#visaType").val();
    if (!visaType) {
      errors.push("يرجى اختيار نوع الفيزة");
      isValid = false;
    } else if (visaType === "other") {
      const otherVisa = $("#otherVisaInput").val().trim();
      if (!otherVisa) {
        errors.push("يرجى كتابة نوع الفيزة المطلوبة");
        isValid = false;
      }
    }
  }

  // عرض النتائج
  if (isValid) {
    console.log("✅ نموذج الحجز صالح");
    showFormSuccess("bookingForm", "جاري إرسال طلب الحجز...");

    // محاكاة عملية الحجز
    simulateBooking(selectedService, fullName, phone);

    return true;
  } else {
    console.log("❌ أخطاء في نموذج الحجز:", errors);
    showFormErrors("bookingForm", errors);
    return false;
  }
}

function validateEmailField($input) {
  const email = $input.val().trim();

  if (!email) {
    $input.removeClass("is-valid is-invalid");
    return;
  }

  if (validateEmail(email)) {
    $input.removeClass("is-invalid").addClass("is-valid");
    showFieldSuccess($input, "البريد الإلكتروني صالح");
  } else {
    $input.removeClass("is-valid").addClass("is-invalid");
    showFieldError($input, "البريد الإلكتروني غير صالح");
  }
}

function validatePhoneField($input) {
  const phone = $input.val().trim();

  if (!phone) {
    $input.removeClass("is-valid is-invalid");
    return;
  }

  if (validatePhone(phone)) {
    $input.removeClass("is-invalid").addClass("is-valid");
    showFieldSuccess($input, "رقم الهاتف صالح");
  } else {
    $input.removeClass("is-valid").addClass("is-invalid");
    showFieldError($input, "رقم الهاتف غير صالح");
  }
}

function validatePasswordField($input) {
  const password = $input.val();

  if (!password) {
    $input.removeClass("is-valid is-invalid");
    return;
  }

  if (password.length >= 6) {
    $input.removeClass("is-invalid").addClass("is-valid");
    showFieldSuccess($input, "كلمة المرور مقبولة");
  } else {
    $input.removeClass("is-valid").addClass("is-invalid");
    showFieldError($input, "كلمة المرور قصيرة");
  }
}

function validateRequiredField($input) {
  const value = $input.val().trim();

  if (!value) {
    $input.addClass("is-invalid");
    showFieldError($input, "هذا الحقل مطلوب");
  } else {
    $input.removeClass("is-invalid").addClass("is-valid");
  }
}
function validatePasswordStrength(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);

function validatePhone(phone) {
  const re = /^[0-9]{9}$/;
  return re.test(phone);
}
};
function showFormSuccess(formId, message) {
  const $form = $("#" + formId);
  const $submitBtn = $form.find('button[type="submit"]');

  const originalText = $submitBtn.html();

  $submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>' + message);
  $submitBtn.prop("disabled", true);

  setTimeout(function () {
    $submitBtn.html(originalText);
    $submitBtn.prop("disabled", false);
    showToast("تم إرسال النموذج بنجاح!", "success");
    $form[0].reset();
    $form.find(".is-valid, .is-invalid").removeClass("is-valid is-invalid");

    const $modal = $form.closest(".modal");
    if ($modal.length) {
      setTimeout(function () {
        $modal.modal("hide");
      }, 1000);
    }
  }, 2000);
}
function showFormErrors(formId, errors) {
  const $form = $("#" + formId);
  let errorMessage = "يرجى تصحيح الأخطاء التالية:<br>";
  errors.forEach((error, index) => {
    errorMessage += `${index + 1}. ${error}<br>`;
  });

  showToast(errorMessage, "error");

  // إضافة فئة الخطأ للنموذج
  $form.addClass("was-validated");

  // التركيز على أول حقل به خطأ
  const $firstError = $form.find(".is-invalid").first();
  if ($firstError.length) {
    $firstError.focus();
  }
}

// إظهار نجاح الحقل
function showFieldSuccess($input, message) {
  const $feedback = $input.next(".valid-feedback");
  if (!$feedback.length) {
    $input.after('<div class="valid-feedback">' + message + "</div>");
  } else {
    $feedback.text(message);
  }
}

// إظهار خطأ الحقل
function showFieldError($input, message) {
  const $feedback = $input.next(".invalid-feedback");
  if (!$feedback.length) {
    $input.after('<div class="invalid-feedback">' + message + "</div>");
  } else {
    $feedback.text(message);
  }
}

function simulateLogin(email) {
  console.log("🔐 محاكاة تسجيل الدخول لـ:", email);

  setTimeout(function () {
    console.log("✅ تم تسجيل الدخول بنجاح");
  }, 1500);}

function simulateRegistration(name, email, phone) {
  console.log("👤 محاكاة إنشاء حساب:", { name, email, phone });}


  setTimeout(function () {
    console.log("✅ تم إنشاء الحساب بنجاح");
  }, 2000);

function simulateMessageSend(name, email, subject) {
  console.log("📨 محاكاة إرسال رسالة:", { name, email, subject });

  
  setTimeout(function () {
    console.log("✅ تم إرسال الرسالة بنجاح");
  }, 1500);
}

// محاكاة عملية الحجز
function simulateBooking(service, name, phone) {
  console.log("📅 محاكاة عملية الحجز:", { service, name, phone });
  const trackingNumber = "DRB-" + Date.now().toString().substr(-6);


  setTimeout(function () {
    console.log("✅ تم تأكيد الحجز بنجاح");
    showToast(`تم تأكيد حجزك! رقم المتابعة: ${trackingNumber}`, "success");
  }, 2000);
}

window.formValidation = {
  validateEmail: validateEmail,
  validatePhone: validatePhone,
  validateLoginForm: validateLoginForm,
  validateRegisterForm: validateRegisterForm,
  validateContactForm: validateContactForm,
  validateBookingForm: validateBookingForm,
};

console.log("✅ تم تحميل نظام التحقق من النماذج بنجاح");
