import { refreshToken } from "@/services/public/auth-services";
import { toastShow } from "@/utils/toastShow";
import * as FileSystem from "expo-file-system";

export const fileDownloader = async (
  link: string,
  name: string
): Promise<string | undefined> => {
  try {
    const response = await refreshToken();
    if (response.status !== "success") {
      throw new Error("Failed to refresh token");
    }

    const newUri = `${FileSystem.cacheDirectory}${name}`;
    const DownloadUri = await FileSystem.downloadAsync(link, newUri, {
      headers: {
        Authorization: `Bearer ${response.data?.accessToken}`,
      },
    });

    return DownloadUri.uri;
  } catch (e) {
    console.error(e);
    toastShow({ text: "Failed to fetch file", type: "error" });
  }
};
