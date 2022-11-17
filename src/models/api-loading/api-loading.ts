import { types } from "mobx-state-tree";

/**
 * Model description here for TypeScript hints.
 */
export const ApiLoadingStoreModel = types
  .model("apiLoadingStore")
  .props({
    loading: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setLoading(v: boolean) {
      self.loading = v;
    },
  })); // eslint-disable-line @typescript-eslint/no-unused-vars

export const apiLoadingStore = ApiLoadingStoreModel.create();
