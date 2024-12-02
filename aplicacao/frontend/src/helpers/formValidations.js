export const rules = {
  required: (value) => !!value || "Este campo é obrigatório",
  email: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email inválido",
  keywords: (value) =>
    (value && value.split(",").length > 0) || "Informe ao menos uma palavra-chave",

  // Regras para v-file-input
  requiredFile: (value) =>
    (value && value.length > 0) || "Arquivo é obrigatório", // Verifica se o arquivo foi selecionado (ajuste aqui)
  validFileType: (value) =>
    !value || (value[0]?.type === "application/pdf") || "Apenas arquivos PDF são permitidos", // Ajustado para lidar com arrays de arquivos
  maxFileSize: (value) =>
    !value || (value[0]?.size <= 10 * 1024 * 1024) || "O tamanho do arquivo deve ser menor que 10MB", // Ajustado para lidar com arrays de arquivos

  // Regra para data
  date: (value) =>
    !value ||
    /^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
    "Data inválida (formato: DD/MM/AAAA)",

  // Validação para o comprimento da matrícula (somente números e 10 caracteres)
  matriculaLength: (value) =>
    (/^\d{10}$/.test(value) && value.length === 10) || "A matrícula deve ter exatamente 10 caracteres numéricos",
};