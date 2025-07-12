import { BASE_URL } from "../config/config.js";

export async function createRegister(data) {
  try {
    await axios.post(`${BASE_URL}/financeRegistry`, data);
  } catch (err) {
    console.log(`Erro ao criar registro: ${err?.message}`);
  }
}

export async function getRegistersTypes() {
  try {
    const res = await axios.get(`${BASE_URL}/financeType/getAll`);

    return res.data;
  } catch (err) {
    console.log(`Erro ao obter os tipos: ${err?.message}`);
  }
}
