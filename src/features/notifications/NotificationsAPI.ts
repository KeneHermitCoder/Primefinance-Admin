import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, httpClient } from '../../utils';

export type NotificationType = "loan";
export type NotificationStatus = "unread" | "read";
interface Notification {
   _id: string; // Unique identifier (UUID)
   created_at: string; // Timestamp in ISO format
   updated_at: string; // Timestamp of when the transaction was updated
   name: string; // Name of the notification
   user: string; // User ID (UUID)
   message: string; // Notification message
   type: NotificationType; // Restricted to "loan"
   status: NotificationStatus; // Restricted to "unread" or "read"
}

export default class NotificationsAPI {


  public getMultipleNotifications = createAsyncThunk(
    'notifications/getMultipleNotifications',
     async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, thunkAPI) => {
                try {
                    const response = await httpClient({
                        method: 'GET',
                        url: '/api/data/messages',
                    });
    
                    const { data }: { data: Notification[] } = response;
                    return { data: data.slice((page - 1) * limit, page * limit), total: data.length };
                } catch (error: any) {
                    return thunkAPI.rejectWithValue(handleError(error));
                }
     }
  );

  public getNotificationOverviewData = createAsyncThunk(
    'notifications/getNotificationOverviewData',
    async (_, thunkAPI) => {
  
        try {
            const response = await httpClient({
                method: 'GET',
                url: '/api/data/messages',
                isAuth: true,
            });

            const { data }: { data: Notification[] } = response;
            return {

                notificationId: data.filter((notification: Notification)=> notification._id),
                notificationName: data.filter((notification: Notification) => notification.name),
                notificationCategory: data.filter((notification: Notification) => notification.type),
                user: data.filter((notification: Notification) => notification.user),
                notificationStatus: data.filter((notification: Notification) => notification.status),
                notificationMessage: data.filter((notification: Notification) => notification.message),
                notificationDate: data.filter((notification: Notification) => notification.created_at),
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
            }
    );

  public getNotificationsKPIData = createAsyncThunk(
    'notifications/getNotificationsKPIData',
    async (_, thunkAPI) => {
        try{
            const response = await httpClient({
                method: 'GET',
                url: '/api/data/messages',
                isAuth: true,
            });
            const { data }: { data: Notification[] } = response;
            return{
                totalNotifications: data.length || 0,
                unreadNotifications: data.filter(n => n.status === 'unread').length,
                mostFrequentType: data.reduce((acc: Record<string, number>, n) => {
                  acc[n.type] = (acc[n.type] || 0) + 1;
                  return acc;
                }, {}),
               successRate: (data.filter(n => n.status === 'read').length / data.length) * 100 || 0,
          

            }

        }catch(error: any){
            return thunkAPI.rejectWithValue(handleError(error));
        }
    }
  );
}
