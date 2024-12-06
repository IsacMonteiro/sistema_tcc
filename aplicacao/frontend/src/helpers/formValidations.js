export const rules = {
  // Validação para o preenchimento dos Campos
  required: (value) => !!value || "Este campo é obrigatório",

  // Regra para o campo Email
  email: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email inválido",

  // Regra para o campo Palavras-Chave
  keywords: (value) =>
    (value && value.split(",").length > 0) || "Informe ao menos uma palavra-chave",

  // Regras para o campo Arquivo
  requiredFile: (value) =>
    (value && value.length > 0) || "Arquivo é obrigatório", // Verifica se o arquivo foi selecionado
  validFileType: (value) =>
    !value || (value[0]?.type === "application/pdf") || "Apenas arquivos PDF são permitidos", // Verifica a extensão do arquivo selecionado
  maxFileSize: (value) =>
    !value || (value[0]?.size <= 10 * 1024 * 1024) || "O tamanho do arquivo deve ser menor que 10MB", // Verifica o tamanho do arquivo selecionado

  // Regra para o campo Data
  date: (value) =>
    !value ||
    /^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
    "Data inválida (formato: DD/MM/AAAA)",

  // Validação para o comprimento da matrícula (somente números e 10 caracteres)
  matriculaLength: (value) =>
    (/^\d{10}$/.test(value) && value.length === 10) || "A matrícula deve ter exatamente 10 caracteres numéricos",
};