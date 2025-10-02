/**
 * @name CustomCallBackground
 * @version 5.0.0
 * @description Cambia el color de fondo en las llamadas de Discord (FUNCIONA con inline styles)
 * @author Starling
 */

module.exports = class CustomCallBackground {
    constructor() {
        this.defaultColor = "#000000";
    }

    getName() { return "CustomCallBackground"; }
    getDescription() { return "Cambia el color de fondo detrás de los avatares en llamadas"; }
    getVersion() { return "5.0.0"; }
    getAuthor() { return "Starling"; }

    start() {
        console.log("%c[CustomCallBackground] Plugin iniciado", "color: #43b581; font-weight: bold;");
        this.loadSettings();
        this.applyStyles();
        BdApi.showToast("✓ CustomCallBackground activado", { type: "success" });
    }

    stop() {
        console.log("%c[CustomCallBackground] Plugin detenido", "color: #f04747; font-weight: bold;");
        BdApi.clearCSS("CustomCallBackground");
        BdApi.showToast("CustomCallBackground desactivado", { type: "info" });
    }

    loadSettings() {
        this.settings = BdApi.Data.load("CustomCallBackground", "settings") || {};
        if (!this.settings.backgroundColor) {
            this.settings.backgroundColor = this.defaultColor;
            this.saveSettings();
        }
    }

    saveSettings() {
        BdApi.Data.save("CustomCallBackground", "settings", this.settings);
    }

    applyStyles() {
        const bgColor = this.settings.backgroundColor;
        
        const css = `
            /* === SOLUCIÓN DEFINITIVA === */
            /* Selector ultra-específico que sobrescribe inline styles */
            
            /* El div que contiene el background color auto-generado */
            [class*="background_"][style*="background-color"] {
                background-color: ${bgColor} !important;
                background: ${bgColor} !important;
            }

            /* Contenedores de tiles */
            [class*="tile_"][class*="idle_"],
            [class*="tile_"][class*="noBorder_"] {
                background: ${bgColor} !important;
            }

            /* Contenedor principal de video */
            [class*="wrapper_"][class*="focusedVideo_"] {
                background: ${bgColor} !important;
            }

            /* Contenedores de participantes */
            [class*="tileChild_"],
            [class*="videoWrapper"] {
                background: ${bgColor} !important;
            }

            /* === SELECTORES ADICIONALES === */
            
            .tile-2TcwiO,
            .video-3n15R6,
            .videoWrapper-1J6hof,
            .voiceUser-1K6Xox,
            .border-2Vy6FN,
            .avatarContainer-3CQrif,
            .root-22AK9z,
            .tile-2naSqK > div,
            .videoGrid-1t2cja > div {
                background: ${bgColor} !important;
            }
        `;

        BdApi.clearCSS("CustomCallBackground");
        BdApi.injectCSS("CustomCallBackground", css);
        
        console.log(`%c[CustomCallBackground] ✓ Estilos aplicados: ${bgColor}`, "color: #43b581; font-weight: bold;");
    }

    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.style.cssText = "padding: 20px; color: #dcddde; font-family: 'gg sans', sans-serif;";
        
        panel.innerHTML = `
            <style>
                .ccb-container { max-width: 600px; }
                .ccb-header { 
                    font-size: 20px; 
                    font-weight: 600; 
                    color: #fff; 
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #4f545c;
                }
                .ccb-section {
                    background: #2f3136;
                    padding: 16px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                }
                .ccb-label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    color: #b9bbbe;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .ccb-input {
                    width: 100%;
                    padding: 12px;
                    background: #202225;
                    border: 1px solid #202225;
                    border-radius: 4px;
                    color: #dcddde;
                    font-size: 16px;
                    font-family: 'Consolas', 'Monaco', monospace;
                    transition: border-color 0.2s;
                }
                .ccb-input:focus {
                    outline: none;
                    border-color: #00b0f4;
                }
                .ccb-preview {
                    width: 100%;
                    height: 60px;
                    border-radius: 8px;
                    margin-top: 12px;
                    border: 2px solid #202225;
                    transition: background 0.3s;
                }
                .ccb-button {
                    padding: 12px 24px;
                    background: #5865f2;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                    margin-right: 10px;
                }
                .ccb-button:hover {
                    background: #4752c4;
                }
                .ccb-button:active {
                    background: #3c45a5;
                }
                .ccb-button-test {
                    background: #43b581;
                }
                .ccb-button-test:hover {
                    background: #3ca374;
                }
                .ccb-examples {
                    background: #202225;
                    padding: 12px;
                    border-radius: 4px;
                    font-size: 13px;
                    line-height: 1.8;
                    color: #b9bbbe;
                }
                .ccb-examples code {
                    background: #2f3136;
                    padding: 2px 6px;
                    border-radius: 3px;
                    color: #00b0f4;
                    font-family: 'Consolas', 'Monaco', monospace;
                    cursor: pointer;
                }
                .ccb-examples code:hover {
                    background: #43b581;
                    color: white;
                }
                .ccb-note {
                    font-size: 12px;
                    color: #72767d;
                    margin-top: 8px;
                    font-style: italic;
                }
                .ccb-success {
                    background: #43b581;
                    color: white;
                    padding: 12px;
                    border-radius: 4px;
                    margin-bottom: 16px;
                    text-align: center;
                    font-weight: 600;
                }
            </style>

            <div class="ccb-container">
                <div class="ccb-header">🎨 Configuración de Color</div>

                <div class="ccb-success">
                    ✓ Problema detectado y solucionado. Usa selectores específicos para Discord.
                </div>

                <div class="ccb-section">
                    <label class="ccb-label">Color de Fondo</label>
                    <input 
                        type="text" 
                        class="ccb-input" 
                        id="ccb-color-input" 
                        placeholder="${this.defaultColor}"
                        value="${this.settings.backgroundColor}"
                    >
                    <div class="ccb-preview" id="ccb-preview"></div>
                    <div class="ccb-note">
                        💡 Vista previa arriba. Los cambios se aplican instantáneamente al guardar.
                    </div>
                </div>

                <div style="margin-bottom: 16px;">
                    <button class="ccb-button" id="ccb-apply-btn">✓ Aplicar y Guardar</button>
                    <button class="ccb-button ccb-button-test" id="ccb-test-btn">🧪 Probar con Rojo</button>
                </div>

                <div class="ccb-section">
                    <label class="ccb-label">📋 Ejemplos de Colores (Haz clic para probar)</label>
                    <div class="ccb-examples" id="ccb-examples">
                        <strong>Colores sólidos:</strong><br>
                        • <code data-color="#000000">#000000</code> - Negro puro<br>
                        • <code data-color="#1a1a1a">#1a1a1a</code> - Gris muy oscuro<br>
                        • <code data-color="#2b2d31">#2b2d31</code> - Gris Discord<br>
                        • <code data-color="#5865f2">#5865f2</code> - Azul Discord<br>
                        • <code data-color="#ed4245">#ed4245</code> - Rojo Discord<br>
                        • <code data-color="#57f287">#57f287</code> - Verde Discord<br><br>
                        
                        <strong>Colores transparentes:</strong><br>
                        • <code data-color="rgba(0, 0, 0, 0.7)">rgba(0, 0, 0, 0.7)</code> - Negro 70%<br>
                        • <code data-color="rgba(88, 101, 242, 0.5)">rgba(88, 101, 242, 0.5)</code> - Azul transparente<br><br>
                        
                        <strong>Gradientes:</strong><br>
                        • <code data-color="linear-gradient(135deg, #667eea, #764ba2)">linear-gradient(135deg, #667eea, #764ba2)</code><br>
                        • <code data-color="linear-gradient(to right, #ff6b6b, #4ecdc4)">linear-gradient(to right, #ff6b6b, #4ecdc4)</code>
                    </div>
                </div>
            </div>
        `;

        // Funcionalidad
        const input = panel.querySelector("#ccb-color-input");
        const preview = panel.querySelector("#ccb-preview");
        const applyBtn = panel.querySelector("#ccb-apply-btn");
        const testBtn = panel.querySelector("#ccb-test-btn");
        const examples = panel.querySelectorAll("#ccb-examples code[data-color]");

        // Preview en tiempo real
        const updatePreview = () => {
            const color = input.value.trim() || this.defaultColor;
            preview.style.background = color;
        };

        input.addEventListener("input", updatePreview);
        updatePreview();

        // Aplicar cambios
        applyBtn.addEventListener("click", () => {
            const newColor = input.value.trim() || this.defaultColor;
            this.settings.backgroundColor = newColor;
            this.saveSettings();
            this.applyStyles();
            BdApi.showToast("✓ Color aplicado - Entra a una llamada para verlo", { type: "success", timeout: 5000 });
        });

        // Botón de prueba rápida
        testBtn.addEventListener("click", () => {
            input.value = "#FF0000";
            updatePreview();
            this.settings.backgroundColor = "#FF0000";
            this.saveSettings();
            this.applyStyles();
            BdApi.showToast("🧪 Color de prueba aplicado (ROJO)", { type: "info", timeout: 5000 });
        });

        // Click en ejemplos
        examples.forEach(code => {
            code.addEventListener("click", () => {
                const color = code.getAttribute("data-color");
                input.value = color;
                updatePreview();
            });
        });

        return panel;
    }
};