import { computed } from "@angular/core";
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";

import { ADMIN_TABS, AdminTabName } from "@/pages/admin-menu/config";

interface AdminMenuTabsState {
  selectedTabName: AdminTabName;
}

const initialState: AdminMenuTabsState = {
  selectedTabName: ADMIN_TABS[0].name,
};

export const AdminMenuTabsStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store) => ({
    setSelectedTab: (state: AdminTabName) =>
      patchState(store, { selectedTabName: state }),
  })),
  withComputed(({ selectedTabName }) => ({
    selectedTabIndex: computed(() =>
      ADMIN_TABS.findIndex((tab) => selectedTabName() === tab.name),
    ),
  })),
);
