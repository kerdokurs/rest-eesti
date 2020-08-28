import axios from 'axios';

const ILM_API = 'https://ilm.ee/sisu/2015/json_avakaart.php3';

const LINNA_ILM = 'https://ilm.ee/sisu/2015/json_linnailm.php3?linn=L*%linn%*0';

export const linnaIlm = async (linnId: string) => {
  const url = LINNA_ILM.replace('%linn%', linnId);

  const data = await axios({
    method: 'get',
    url: url,
    timeout: 4000,
  }).then((response) => response.data);

  for (const obj of data.NOAA) {
    delete obj.sk;
    delete obj.sumpilv;
    delete obj.n_sk;
    delete obj.n_sumpilv;
  }

  return data.NOAA;
};
