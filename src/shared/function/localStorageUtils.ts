import { CoreTarget } from '@/app/interface/target';
import { LOCAL_STORAGE_ITEM_CORE_TARGET } from '../constants/localStorage';

/** local storage 내 [LOCAL_STORAGE_ITEM_CORE_TARGET] 값 존재여부 */
export const hasLocalStorageCoreTargetValue = (): CoreTarget | undefined => {
  const value = localStorage.getItem(LOCAL_STORAGE_ITEM_CORE_TARGET);
  return value ? JSON.parse(value) : undefined;
};

/** local storage 내 [LOCAL_STORAGE_ITEM_CORE_TARGET] 값 저장 */
export const setLocalStorageCoreTargetValue = (params: CoreTarget) => {
  const value = JSON.stringify(params);
  localStorage.setItem(LOCAL_STORAGE_ITEM_CORE_TARGET, value);
};

/** local storage 내 [LOCAL_STORAGE_ITEM_CORE_TARGET] 값 제거 */
export const removeLocalStorageCoreTargetValue = () => localStorage.removeItem(LOCAL_STORAGE_ITEM_CORE_TARGET);
