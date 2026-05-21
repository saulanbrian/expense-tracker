import { useCameraPermissions } from "expo-camera";
import { CameraPermissionResponse } from "expo-image-picker";
import { useEffect, useState } from "react";

export const useRequestCameraPermission = () => {
  const [initialCameraPermission, requestCameraPermissions] =
    useCameraPermissions();
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionResponse>();

  useEffect(() => {
    (async () => {
      if (!initialCameraPermission?.granted) {
        if (initialCameraPermission?.canAskAgain) {
          const permission = await requestCameraPermissions();
          setCameraPermission(permission);
        }
      }
    })();
  }, []);

  return {
    initialCameraPermission,
    cameraPermission,
    requestCameraPermissions,
  };
};
