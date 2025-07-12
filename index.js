import { createRegister, getRegistersTypes } from "./src/api/api.js";

const registry_form = document.getElementById("registry-form");
const registry_type = document.getElementById("registry-type");
const registry_category = document.getElementById("registry-category");

document.addEventListener("DOMContentLoaded", async () => {
  const types = await getRegistersTypes();
  createOptionsSelect(registry_type, types, "cod_tipo");

  registry_type.addEventListener("change", async () => {
    while (registry_category.options.length >= 2) registry_category.remove(1);
    registry_category.value = "";
    registry_category.disabled = false;

    const typeSelected = registry_type.selectedIndex;
    const categories = types.find(
      (item) => item.cod_tipo === typeSelected
    ).categorias;

    createOptionsSelect(registry_category, categories, "cod_categoria");
  });
});

function createOptionsSelect(select, data, label) {
  data.forEach((item) => {
    const option = new Option(item.nome, item[label]);
    select.appendChild(option);
  });
}

registry_form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const registry_date = document.getElementById("registry-date");
  const registry_name = document.getElementById("registry-title");
  const registry_value = document.getElementById("registry-value");

  const category_index = registry_category.selectedIndex;
  const category_option = registry_category.options.item(category_index);

  const type_index = registry_type.selectedIndex;
  const type_option = registry_type.options.item(type_index);

  const data = {
    ano: parseInt(registry_date.value.slice(0, 4)),
    mes: parseInt(registry_date.value.slice(5, 7)),
    nome: registry_name.value,
    valor: parseFloat(registry_value.value).toFixed(2),
    cod_categoria: parseInt(category_option.value),
    cod_tipo: parseInt(type_option.value),
  };

  await createRegister(data);

  clearInputs();
});

function clearInputs() {
  const elements = registry_form.elements;
  for (let element of elements) {
    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
      element.value = "";
    }
  }

  registry_category.disabled = true;
}
