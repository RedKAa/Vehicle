import request from '@/utils/requestRouting';
import requestServer from '@/utils/requestServer';

export const getStation = (areaId) => request.get(`/areas/${areaId}/stations`);

export const addStation = (data) => request.post('/stations', { data });

export const deleteStation = (stationId) => request.delete(`/stations/${stationId}`);

export const addDriver = (data) => request.post(`/drivers`, { data });

export const getOrdersOfArea = (params) => requestServer.get(`/areas/orders`, { params });
