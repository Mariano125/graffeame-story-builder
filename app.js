// Canvas HD Dimensions for Instagram Story
const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

class StoryBuilder {
  constructor() {
    this.canvas = document.getElementById("storyCanvas");
    this.ctx = this.canvas.getContext("2d");
    
    // Set actual render resolution to 1080x1920
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;

    // State
    this.userImage = null;
    this.logoImage = new Image();
    this.showLogo = true;
    
    // Auto-load official GRAFFO brand logo PNG
    this.logoImage.onload = () => {
      this.draw();
    };
    this.logoImage.src = "brand_logo.png";

    this.imgX = 0;
    this.imgY = 0;
    this.imgScale = 1;
    this.blurBg = true;
    
    // Photo Retouch State (Instagram enhancement)
    this.brightness = 105;
    this.contrast = 115;
    this.saturation = 125;
    this.vignette = 25;
    
    // Current Preset Data
    this.theme = MARKETING_PRESETS.themes[0];
    this.headlineText = "TU MATE, TU HISTORIA 🧉✨";
    this.subText = "Grabado láser 100% personalizado con tu nombre o logo.";
    this.ctaText = "Escribinos por MP y diseñamos el tuyo 📩";
    this.badgeText = "GRABADO LÁSER ⚡";
    this.handleText = "@graffeame";
    this.showBadge = true;
    this.showHandle = true;
    this.showStickerPrompt = false;
    this.stickerQuestion = "¿Cuál preferís para regalar?";

    this.initEvents();
    this.renderCategoryOptions();
    this.renderThemeOptions();
    this.draw();
  }

  initEvents() {
    // Image Upload
    document.getElementById("imageInput").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            this.userImage = img;
            this.resetImagePosition();
            this.draw();
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Logo Upload
    document.getElementById("logoInput").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            this.logoImage = img;
            this.draw();
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Image adjustment controls
    document.getElementById("scaleInput").addEventListener("input", (e) => {
      this.imgScale = parseFloat(e.target.value);
      this.draw();
    });

    document.getElementById("blurBgToggle").addEventListener("change", (e) => {
      this.blurBg = e.target.checked;
      this.draw();
    });

    // Retouch Sliders Events
    const brightnessInput = document.getElementById("brightnessInput");
    const contrastInput = document.getElementById("contrastInput");
    const saturateInput = document.getElementById("saturateInput");
    const vignetteInput = document.getElementById("vignetteInput");

    const updateRetouchUI = () => {
      document.getElementById("brightnessVal").textContent = `${this.brightness}%`;
      document.getElementById("contrastVal").textContent = `${this.contrast}%`;
      document.getElementById("saturateVal").textContent = `${this.saturation}%`;
      document.getElementById("vignetteVal").textContent = `${this.vignette}%`;

      if (brightnessInput) brightnessInput.value = this.brightness;
      if (contrastInput) contrastInput.value = this.contrast;
      if (saturateInput) saturateInput.value = this.saturation;
      if (vignetteInput) vignetteInput.value = this.vignette;
    };

    if (brightnessInput) {
      brightnessInput.addEventListener("input", (e) => {
        this.brightness = parseInt(e.target.value);
        updateRetouchUI();
        this.draw();
      });
    }
    if (contrastInput) {
      contrastInput.addEventListener("input", (e) => {
        this.contrast = parseInt(e.target.value);
        updateRetouchUI();
        this.draw();
      });
    }
    if (saturateInput) {
      saturateInput.addEventListener("input", (e) => {
        this.saturation = parseInt(e.target.value);
        updateRetouchUI();
        this.draw();
      });
    }
    if (vignetteInput) {
      vignetteInput.addEventListener("input", (e) => {
        this.vignette = parseInt(e.target.value);
        updateRetouchUI();
        this.draw();
      });
    }

    // Filter Preset Buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const filterType = e.currentTarget.getAttribute("data-filter");
        if (filterType === "auto") {
          this.brightness = 105;
          this.contrast = 115;
          this.saturation = 125;
          this.vignette = 25;
        } else if (filterType === "wood") {
          this.brightness = 102;
          this.contrast = 110;
          this.saturation = 135;
          this.vignette = 30;
        } else if (filterType === "steel") {
          this.brightness = 108;
          this.contrast = 125;
          this.saturation = 105;
          this.vignette = 15;
        } else if (filterType === "vibrant") {
          this.brightness = 110;
          this.contrast = 120;
          this.saturation = 165;
          this.vignette = 20;
        } else if (filterType === "none") {
          this.brightness = 100;
          this.contrast = 100;
          this.saturation = 100;
          this.vignette = 0;
        }
        updateRetouchUI();
        this.draw();
      });
    });

    const resetRetouchBtn = document.getElementById("resetRetouchBtn");
    if (resetRetouchBtn) {
      resetRetouchBtn.addEventListener("click", () => {
        this.brightness = 100;
        this.contrast = 100;
        this.saturation = 100;
        this.vignette = 0;
        updateRetouchUI();
        this.draw();
      });
    }

    // Text inputs
    document.getElementById("headlineInput").addEventListener("input", (e) => {
      this.headlineText = e.target.value;
      this.draw();
    });
    document.getElementById("subInput").addEventListener("input", (e) => {
      this.subText = e.target.value;
      this.draw();
    });
    document.getElementById("ctaInput").addEventListener("input", (e) => {
      this.ctaText = e.target.value;
      this.draw();
    });
    document.getElementById("badgeInput").addEventListener("input", (e) => {
      this.badgeText = e.target.value;
      this.draw();
    });
    document.getElementById("handleInput").addEventListener("input", (e) => {
      this.handleText = e.target.value;
      this.draw();
    });

    // Toggles
    const toggleLogoEl = document.getElementById("toggleLogo");
    if (toggleLogoEl) {
      toggleLogoEl.addEventListener("change", (e) => {
        this.showLogo = e.target.checked;
        this.draw();
      });
    }
    document.getElementById("toggleBadge").addEventListener("change", (e) => {
      this.showBadge = e.target.checked;
      this.draw();
    });
    document.getElementById("toggleHandle").addEventListener("change", (e) => {
      this.showHandle = e.target.checked;
      this.draw();
    });
    document.getElementById("toggleSticker").addEventListener("change", (e) => {
      this.showStickerPrompt = e.target.checked;
      document.getElementById("stickerGroup").classList.toggle("hidden", !this.showStickerPrompt);
      this.draw();
    });
    document.getElementById("stickerInput").addEventListener("input", (e) => {
      this.stickerQuestion = e.target.value;
      this.draw();
    });

    // Download Button
    document.getElementById("downloadBtn").addEventListener("click", () => {
      this.downloadStory();
    });

    // Copy Caption Button
    document.getElementById("copyCaptionBtn").addEventListener("click", () => {
      const fullText = `${this.headlineText}\n\n${this.subText}\n\n👉 ${this.ctaText}\n\n📍 @graffeame - Grabados Láser Personalizados\n#graffeame #grabadolaser #regalospersonalizados #mates #asadores`;
      navigator.clipboard.writeText(fullText).then(() => {
        alert("¡Texto de la historia copiado al portapapeles! 📋");
      });
    });
  }

  resetImagePosition() {
    if (!this.userImage) return;
    // Scale image to fill/fit height or width
    const aspectImg = this.userImage.width / this.userImage.height;
    const aspectCanvas = CANVAS_WIDTH / CANVAS_HEIGHT;

    if (aspectImg > aspectCanvas) {
      // Wider image -> fit height
      this.imgScale = CANVAS_HEIGHT / this.userImage.height;
    } else {
      // Taller image -> fit width
      this.imgScale = CANVAS_WIDTH / this.userImage.width;
    }
    document.getElementById("scaleInput").value = this.imgScale.toFixed(2);
  }

  renderCategoryOptions() {
    const select = document.getElementById("categorySelect");
    const container = document.getElementById("presetCopysList");

    if (!select || !container) return;

    select.innerHTML = "";
    MARKETING_PRESETS.categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = `${cat.name}`;
      select.appendChild(opt);
    });

    const renderCopysForCategory = (catId) => {
      container.innerHTML = "";
      const selectedCat = MARKETING_PRESETS.categories.find((c) => c.id === catId) || MARKETING_PRESETS.categories[0];
      
      selectedCat.copys.forEach((item) => {
        const itemBtn = document.createElement("button");
        itemBtn.className = "text-left p-3 rounded-xl border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-800 hover:border-zinc-700 transition flex flex-col gap-1 cursor-pointer shadow-sm group";
        itemBtn.innerHTML = `
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">${item.title}</span>
            <span class="text-[10px] bg-zinc-800 text-zinc-200 border border-zinc-700 px-2 py-0.5 rounded-full font-bold">${item.badge}</span>
          </div>
          <span class="text-xs sm:text-sm font-black text-white line-clamp-1">${item.headline}</span>
          <span class="text-[11px] text-zinc-400 line-clamp-1">${item.sub}</span>
        `;
        itemBtn.addEventListener("click", () => {
          this.headlineText = item.headline;
          this.subText = item.sub;
          this.ctaText = item.cta;
          this.badgeText = item.badge;
          
          document.getElementById("headlineInput").value = this.headlineText;
          document.getElementById("subInput").value = this.subText;
          document.getElementById("ctaInput").value = this.ctaText;
          document.getElementById("badgeInput").value = this.badgeText;
          
          this.draw();
        });
        container.appendChild(itemBtn);
      });
    };

    select.addEventListener("change", (e) => {
      renderCopysForCategory(e.target.value);
    });

    // Render initial category
    renderCopysForCategory(MARKETING_PRESETS.categories[0].id);
  }

  renderThemeOptions() {
    const container = document.getElementById("themeSelector");
    container.innerHTML = "";

    MARKETING_PRESETS.themes.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = `p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
        this.theme.id === t.id ? "border-yellow-400 bg-yellow-400/10" : "border-gray-700 bg-gray-800"
      }`;
      btn.innerHTML = `
        <div>
          <div class="text-xs font-bold text-white">${t.name}</div>
        </div>
        <div class="flex gap-1">
          <span class="w-4 h-4 rounded-full border border-gray-600" style="background:${t.accentColor}"></span>
          <span class="w-4 h-4 rounded-full border border-gray-600" style="background:${t.gradientBottom}"></span>
        </div>
      `;
      btn.addEventListener("click", () => {
        this.theme = t;
        this.renderThemeOptions();
        this.draw();
      });
      container.appendChild(btn);
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Draw Background
    if (this.userImage) {
      if (this.blurBg) {
        // Draw blurred stretched background
        ctx.save();
        ctx.filter = "blur(40px) brightness(0.6)";
        ctx.drawImage(this.userImage, -100, -100, CANVAS_WIDTH + 200, CANVAS_HEIGHT + 200);
        ctx.restore();
      } else {
        ctx.fillStyle = "#111827";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      // Draw Main Product Image Centered with Retouch Filters
      ctx.save();
      const scaledW = this.userImage.width * this.imgScale;
      const scaledH = this.userImage.height * this.imgScale;
      const posX = (CANVAS_WIDTH - scaledW) / 2;
      const posY = (CANVAS_HEIGHT - scaledH) / 2 - 60; // Slightly higher to leave room for bottom card

      // Apply Retouch Filters (Brightness, Contrast, Saturation)
      ctx.filter = `brightness(${this.brightness}%) contrast(${this.contrast}%) saturate(${this.saturation}%)`;
      ctx.drawImage(this.userImage, posX, posY, scaledW, scaledH);
      ctx.restore();

      // Apply Radial Vignette effect to focus on product center
      if (this.vignette > 0) {
        ctx.save();
        const centerX = CANVAS_WIDTH / 2;
        const centerY = (CANVAS_HEIGHT / 2) - 60;
        const innerRadius = Math.min(scaledW, scaledH) * 0.25;
        const outerRadius = Math.max(scaledW, scaledH) * 0.7;

        const radGrad = ctx.createRadialGradient(
          centerX, centerY, innerRadius,
          centerX, centerY, outerRadius
        );
        radGrad.addColorStop(0, "rgba(0,0,0,0)");
        radGrad.addColorStop(1, `rgba(0,0,0,${this.vignette / 100})`);
        
        ctx.fillStyle = radGrad;
        ctx.fillRect(posX, posY, scaledW, scaledH);
        ctx.restore();
      }
    } else {
      // Default Background Placeholder
      const grad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      grad.addColorStop(0, "#1f2937");
      grad.addColorStop(1, "#111827");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Placeholder text
      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 42px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📷 Cargá la foto de tu producto", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
      ctx.font = "30px sans-serif";
      ctx.fillText("Mates, Cuchillos, Tablas, Bolígrafos, Etiquetas", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
    }

    // 2. Apply Theme Dark Overlay Filter
    ctx.fillStyle = this.theme.bgOverlay;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 3. Draw Gradients for Readability
    // Top Gradient
    const topGrad = ctx.createLinearGradient(0, 0, 0, 420);
    topGrad.addColorStop(0, this.theme.gradientTop);
    topGrad.addColorStop(1, "transparent");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, 420);

    // Bottom Gradient
    const bottomGrad = ctx.createLinearGradient(0, CANVAS_HEIGHT - 750, 0, CANVAS_HEIGHT);
    bottomGrad.addColorStop(0, "transparent");
    bottomGrad.addColorStop(1, this.theme.gradientBottom);
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, CANVAS_HEIGHT - 750, CANVAS_WIDTH, 750);

    // 4. Draw Header / Logo & Handle (@graffeame)
    const topMargin = 120;
    
    // Draw GRAFFO Logo PNG
    if (this.showLogo && this.logoImage && this.logoImage.complete && this.logoImage.naturalWidth !== 0) {
      ctx.save();
      const logoW = 200;
      const logoH = (this.logoImage.naturalHeight / this.logoImage.naturalWidth) * logoW;
      
      // Sombra suave para destacar sobre cualquier foto
      ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
      ctx.shadowBlur = 16;
      ctx.drawImage(this.logoImage, 80, topMargin, logoW, logoH);
      ctx.restore();
    } else if (this.showLogo) {
      // Vector Logo Text Fallback
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 52px sans-serif";
      ctx.textAlign = "left";
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 10;
      ctx.fillText("GRAFFO", 80, topMargin + 40);

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("GRABADOS LÁSER & PERSONALIZADOS", 80, topMargin + 74);
      ctx.restore();
    }

    // Handle Badge (Right side top)
    if (this.showHandle && this.handleText) {
      ctx.save();
      const handleWidth = 320;
      const handleHeight = 64;
      const handleX = CANVAS_WIDTH - 80 - handleWidth;
      const handleY = topMargin + 10;

      // Rounded rectangle background
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      this.roundRect(ctx, handleX, handleY, handleWidth, handleHeight, 32, true, true);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(this.handleText, handleX + handleWidth / 2, handleY + 42);
      ctx.restore();
    }

    // 5. Draw Interactive Sticker Mockup if Enabled
    if (this.showStickerPrompt) {
      this.drawInstagramSticker(ctx, CANVAS_HEIGHT / 2 - 200);
    }

    // 6. Draw Main Content Card at Bottom with Dynamic Height Layout
    const cardMargin = 60;
    const cardWidth = CANVAS_WIDTH - cardMargin * 2;
    const paddingX = 40;
    const contentWidth = cardWidth - paddingX * 2;

    // Helper to calculate required lines for dynamic text wrapping
    const getLinesCount = (text, font, maxWidth) => {
      ctx.save();
      ctx.font = font;
      const words = text.split(" ");
      let line = "";
      let lines = 1;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && n > 0) {
          lines++;
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      ctx.restore();
      return lines;
    };

    const headlineFont = "900 46px sans-serif";
    const headlineLineHeight = 56;
    const headlineLines = getLinesCount(this.headlineText, headlineFont, contentWidth);
    const headlineHeight = headlineLines * headlineLineHeight;

    const subFont = "400 30px sans-serif";
    const subLineHeight = 40;
    const subLines = getLinesCount(this.subText, subFont, contentWidth);
    const subHeight = subLines * subLineHeight;

    const badgeH = (this.showBadge && this.badgeText) ? 48 : 0;
    const badgeGap = (this.showBadge && this.badgeText) ? 24 : 0;
    const headlineGap = 20;
    const subGap = 28;
    const ctaH = 80;

    const innerPaddingTop = 40;
    const innerPaddingBottom = 40;

    const totalContentHeight = innerPaddingTop + badgeH + badgeGap + headlineHeight + headlineGap + subHeight + subGap + ctaH + innerPaddingBottom;
    
    const cardY = CANVAS_HEIGHT - totalContentHeight - 60; // 60px margin from bottom of story
    const cardHeight = totalContentHeight;

    // Draw Glassmorphism Card Container
    ctx.save();
    ctx.fillStyle = this.theme.cardBg;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    this.roundRect(ctx, cardMargin, cardY, cardWidth, cardHeight, 36, true, true);

    let currentY = cardY + innerPaddingTop;

    // Draw Badge
    if (this.showBadge && this.badgeText) {
      ctx.save();
      ctx.font = "bold 26px sans-serif";
      const badgeMetrics = ctx.measureText(this.badgeText);
      const badgeW = badgeMetrics.width + 40;

      ctx.fillStyle = this.theme.badgeBg;
      this.roundRect(ctx, cardMargin + paddingX, currentY, badgeW, badgeH, 14, true, false);

      ctx.fillStyle = this.theme.badgeText;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(this.badgeText, cardMargin + paddingX + 20, currentY + badgeH / 2);
      ctx.restore();

      currentY += badgeH + badgeGap;
    }

    // Draw Headline Text
    ctx.save();
    ctx.fillStyle = this.theme.textColor;
    ctx.font = headlineFont;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    currentY = this.wrapText(ctx, this.headlineText, cardMargin + paddingX, currentY, contentWidth, headlineLineHeight);
    ctx.restore();

    currentY += headlineGap;

    // Draw Subtext
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = subFont;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    currentY = this.wrapText(ctx, this.subText, cardMargin + paddingX, currentY, contentWidth, subLineHeight);
    ctx.restore();

    currentY += subGap;

    // Draw Call To Action Button (CTA)
    ctx.save();
    ctx.fillStyle = this.theme.accentColor;
    this.roundRect(ctx, cardMargin + paddingX, currentY, contentWidth, ctaH, 20, true, false);

    ctx.fillStyle = this.theme.badgeText || "#000000";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.ctaText, cardMargin + cardWidth / 2, currentY + ctaH / 2);
    ctx.restore();

    ctx.restore();
  }

  drawInstagramSticker(ctx, yPos) {
    ctx.save();
    const width = 640;
    const height = 180;
    const x = (CANVAS_WIDTH - width) / 2;

    // Sticker background
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 30;
    this.roundRect(ctx, x, yPos, width, height, 28, true, false);

    // Sticker Title
    ctx.fillStyle = "#111827";
    ctx.font = "bold 30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(this.stickerQuestion, x + width / 2, yPos + 60);

    // Option Buttons Mockup
    const optW = width / 2 - 30;
    const optH = 64;
    
    // Left Option
    ctx.fillStyle = "#F3F4F6";
    this.roundRect(ctx, x + 20, yPos + 90, optW, optH, 16, true, false);
    ctx.fillStyle = "#374151";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(" Opción A 🧉", x + 20 + optW / 2, yPos + 132);

    // Right Option
    ctx.fillStyle = "#F3F4F6";
    this.roundRect(ctx, x + width / 2 + 10, yPos + 90, optW, optH, 16, true, false);
    ctx.fillStyle = "#374151";
    ctx.fillText(" Opción B 🔥", x + width / 2 + 10 + optW / 2, yPos + 132);

    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    return y + lineHeight;
  }

  downloadStory() {
    this.canvas.toBlob(async (blob) => {
      if (!blob) return;

      const fileName = `graffeame_historia_${Date.now()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // 1. Intentar Web Share API nativo de celular (iOS Safari / Android Chrome)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Historia @graffeame",
            text: "Historia de Instagram @graffeame"
          });
          return;
        } catch (err) {
          console.log("Compartir cancelado o no disponible", err);
        }
      }

      // 2. Si no abre Share Sheet o es navegador Web, abrir Modal con imagen HD e instrucción de guardar
      const imgUrl = URL.createObjectURL(blob);
      const modalImg = document.getElementById("modalStoryImg");
      const downloadLink = document.getElementById("directDownloadLink");
      const modal = document.getElementById("saveModal");
      const nativeBtn = document.getElementById("nativeShareBtn");

      if (modalImg && modal) {
        modalImg.src = imgUrl;
        if (downloadLink) {
          downloadLink.href = imgUrl;
          downloadLink.download = fileName;
        }
        
        // Guardar referencia al archivo en el botón de compartir
        if (nativeBtn) {
          nativeBtn.onclick = async () => {
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({ files: [file] });
              } catch (e) {}
            } else {
              // Descarga por enlace
              const link = document.createElement("a");
              link.href = imgUrl;
              link.download = fileName;
              link.click();
            }
          };
        }

        modal.classList.remove("hidden");
      } else {
        // Enlace de descarga directo
        const link = document.createElement("a");
        link.download = fileName;
        link.href = imgUrl;
        link.click();
      }
    }, "image/png");
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.storyApp = new StoryBuilder();
});
