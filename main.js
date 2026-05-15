
$(document).ready(function () {
  console.log("✅ تم تحميل موقع مكتب دروب الياسين للسفريات والسياحة");
  initializeSite();
  setupNavigation();
  setupForms();
  setupVisualEffects();
  setupNotifications();
  setupInteractions();
  updateDateTime();
});
function initializeSite() {
  console.log("🔧 بدء تهيئة الموقع...");
  if (!window.jQuery) {
    console.error("⚠️ لم يتم تحميل مكتبة jQuery بشكل صحيح");
    return;
  }
  $("body").addClass("js-enabled");

  $(".loading-screen").fadeOut(500);

  initializeSmoothScroll();
}
function setupNavigation() {
  console.log("🔗 إعداد شريط التنقل...");
  highlightActiveLink();

  $(".nav-link").hover(
    function () {
      $(this).addClass("hover-effect");
    },
    function () {
      $(this).removeClass("hover-effect");
    },
  );
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".navbar").addClass("navbar-scrolled");
    } else {
      $(".navbar").removeClass("navbar-scrolled");
    }
  });

  $(".navbar-nav .nav-link").click(function () {
    $(".navbar-collapse").collapse("hide");
  });
}
function setupForms() {
  console.log("📝 إعداد النماذج...");
  $(".form-control")
    .focus(function () {
      $(this).parent().addClass("focused");
    })
    .blur(function () {
      $(this).parent().removeClass("focused");
    });
  $("form").each(function () {
    const formId = $(this).attr("id");
    if (formId) {
      console.log(`📋 تم التعرف على النموذج: ${formId}`);
    }
  });
  $("form").submit(function (e) {
    e.preventDefault();
    console.log("📤 تم محاولة إرسال النموذج: " + $(this).attr("id"));

  });
}
function setupVisualEffects() {
  console.log("🎨 إعداد التأثيرات البصرية...");
  $(".service-card, .package-card, .mission-card").hover(
    function () {
      $(this).stop().animate(
        {
          marginTop: "-10px",
          boxShadow: "0 15px 30px rgba(255, 215, 0, 0.2)",
        },
        200,
      );
    },
    function () {
      $(this).stop().animate(
        {
          marginTop: "0",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        },
        200,
      );
    },
  );
  $(".btn").hover(
    function () {
      $(this).css("transform", "translateY(-3px)");
    },
    function () {
      $(this).css("transform", "translateY(0)");
    },
  );
  $("img")
    .on("load", function () {
      $(this).addClass("loaded");
    })
    .each(function () {
      if (this.complete) {
        $(this).addClass("loaded");
      }
    });

  $(".animate-on-scroll").each(function () {
    $(this).css("opacity", "0");
  });
}
function setupNotifications() {
  console.log("🔔 إعداد الإشعارات...");
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-left",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    rtl: true,
  };

  setTimeout(function () {
    const pageTitle = $("title").text();
    if (!pageTitle.includes("404")) {
      showToast("مرحباً بك في مكتب دروب الياسين للسفريات والسياحة", "info");
    }
  }, 1500);
}
function setupInteractions() {
  console.log("🔄 إعداد التفاعلات الخاصة...");}

  $(".phone-number").click(function (e) {
    e.preventDefault();
    const phoneNumber = $(this).text().trim();
    copyToClipboard(phoneNumber);
    showToast("تم نسخ رقم الهاتف: " + phoneNumber, "success");
  });

  $('a[href^="http"]')
    .not('[href*="' + window.location.host + '"]')
    .attr("target", "_blank");

  $('a[href^="#"]').click(function (e) {
    if ($(this).attr("href") !== "#") {
      e.preventDefault();
      const target = $(this).attr("href");
      if ($(target).length) {
        $("html, body").animate(
          {
            scrollTop: $(target).offset().top - 80,
          },
          800,
        );
      }
    }
  });
  $(".zoomable-image").click(function () {
    const imgSrc = $(this).attr("src");
    openImageModal(imgSrc);
  });

function initializeSmoothScroll() { 
  $('a[href^="#"]:not([href="#"])').click(function () {
    const target = $(this).attr("href");
    if ($(target).length) {
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - 100,
        },
        800,
        "swing",
      );
      return false;
    }
  });
}
function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  $(".nav-link").each(function () {
    const linkHref = $(this).attr("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      $(this).addClass("active");
      $(this).append('<span class="active-indicator"></span>');
    }
  });
}

function showToast(message, type = "info") {
  switch (type) {
    case "success":
      toastr.success(message);
      break;
    case "error":
      toastr.error(message);
      break;
    case "warning":
      toastr.warning(message);
      break;
    case "info":
    default:
      toastr.info(message);
      break;
  }
}
function copyToClipboard(text) {
  const tempInput = $("<input>");
  $("body").append(tempInput);
  tempInput.val(text).select();
  document.execCommand("copy");
  tempInput.remove();
}
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]{9}$/;
  return re.test(phone);
}
function loadContent(url, targetElement, callback) {
  $.ajax({
    url: url,
    method: "post",
    beforeSend: function () {
      $(targetElement).html(
        '<div class="loading-spinner"><div class="spinner"></div><p>جاري التحميل...</p></div>',
      );
    },
    success: function (data) {
      $(targetElement).html(data);
      if (callback) callback(true);
    },
    error: function () {
      $(targetElement).html(
        '<div class="alert alert-danger">حدث خطأ في تحميل المحتوى</div>',
      );
      if (callback) callback(false);
    },
  });
}

function openImageModal(imageSrc) {
  const modalHtml = `
        <div class="modal fade" id="imageModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${imageSrc}" class="img-fluid rounded" alt="صورة مكبرة">
                    </div>
                </div>
            </div>
        </div>
    `;

  $("body").append(modalHtml);
  $("#imageModal").modal("show");

  $("#imageModal").on("hidden.bs.modal", function () {
    $(this).remove();
  });
}

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateTimeString = now.toLocaleDateString("ar-SA", options);
  $(".current-datetime").text(dateTimeString);
}
setInterval(updateDateTime, 1000);

$("img").on("error", function () {
  $(this).attr("src", "images/placeholder.jpg");
  $(this).addClass("image-error");
});
let scrollTimer;
$(window).scroll(function () {
  clearTimeout(scrollTimer);
  $("body").addClass("scrolling");

  scrollTimer = setTimeout(function () {
    $("body").removeClass("scrolling");
  }, 200);
});
function checkUserSession() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date().getTime();

  if (!lastVisit) {
  
    localStorage.setItem("firstVisit", now);
    showToast("مرحباً بك في أول زيارة لك لموقعنا!", "info");
  } else {
    const hoursSinceLastVisit = Math.floor(
      (now - lastVisit) / (1000 * 60 * 60),
    );
    if (hoursSinceLastVisit > 24) {
      showToast(
        "مرحباً بعودتك! لقد مضى أكثر من 24 ساعة منذ زيارتك الأخيرة",
        "info",
      );
    }
  }

  localStorage.setItem("lastVisit", now);
}
$(window).on("load", function () {
  console.log("🎯 تم تحميل جميع الموارد");

  $(".preloader").fadeOut(500);

  // فحص جلسة المستخ
  checkUserSession();

  // إضافة تأثير ظهور للعناصر
  $(".fade-in-element").each(function (i) {
    $(this)
      .delay(i * 200)
      .animate({ opacity: 1 }, 500);
  });

  // تهيئة شريط التقدم إن وجد
  $(".progress-bar").each(function () {
    const width = $(this).data("width") || "100%";
    $(this).animate({ width: width }, 1500);
  });
});

window.addEventListener("online", function () {
  showToast("تم استعادة الاتصال بالإنترنت", "success");
  $("body").removeClass("offline-mode");
});

window.addEventListener("offline", function () {
  showToast("فقد الاتصال بالإنترنت، يتم العمل في الوضع المحلي", "warning");
  $("body").addClass("offline-mode");
});

window.siteFunctions = {
  showToast: showToast,
  validateEmail: validateEmail,
  validatePhone: validatePhone,
  copyToClipboard: copyToClipboard,
  loadContent: loadContent,
};

console.log("🚀 تم تهيئة جميع وظائف الموقع بنجاح");
