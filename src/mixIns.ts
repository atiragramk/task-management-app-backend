import { model, Schema } from "mongoose";

function ModelMixIn<T>(name: string, schema: Schema) {
  class Base {
    private _model = model<T>(name, schema);
    get model() {
      return this._model;
    }
  }
  return Base;
}

export default ModelMixIn;
