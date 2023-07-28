
import request from '@/utils/requestServer';


export const updateTransactionVehicles = async (item, vehicles) => {
  let normalizeData = [];

  let ids = item.transaction?.transactionLines?.map(tl => id)
  let tranlineIds = [...new Set(ids)];
 
  for (const vehicle of vehicles) {
   normalizeData.push({
      "status": "Active",
      "transactionId": item.transaction?.id,
      "vehicleId": vehicle.vehicleId,
      "wareHouseId": null,
      "picId": null,
      "amount": vehicle.amount,
      "note": ""
    })
  }
  return deleteTransactionLines(tranlineIds).then(() => addTransactionLines(normalizeData));
}

export const addTransactionLines = (tranlines) => {
   return request.post(`/transactionlines/many`, {
     data: tranlines,
   });
}

export const deleteTransactionLines = (tranlineIds) => {
   return request.delete(`/transactionlines/`, {
     data: tranlineIds,
   });
}
