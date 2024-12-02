export function handleReset(refForm, obra) {
  refForm.reset();
  obra = {
    titulo: "",
    tipo: "",
    data_apresentacao: null,
    resumo: "",
    palavras_chave: "",
    arquivo: null,
    fk_id_curso: null,
    autor: { matricula: "", nome: "", email: "" },
    orientador: { matricula: "", nome: "", titulacao: "", areaAtuacao: "", email: "" },
    coorientador: { matricula: "", nome: "", titulacao: "", areaAtuacao: "", email: "" },
    possuiCoorientador: false,
  };
  refForm.resetValidation();
}  
  
export const handleFormSubmit = async (formRef, obra, cadastrarObra, router) => {
  if (formRef.validate()) {
    try {
      await cadastrarObra(obra);
      router.push("/HomePageAdm");
    } catch (error) {
      console.error(error);
    }
  }
};  