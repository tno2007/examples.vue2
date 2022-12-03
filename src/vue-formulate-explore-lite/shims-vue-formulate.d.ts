declare module "@braid/vue-formulate" {
  import { Vue, VueConstructor } from "vue/types/vue";
  import { PluginFunction } from "vue";

  export interface IVueFormulate {
    /**
     * Used to submit a form programmatically.
     * @param formName
     */
    submit(formName: string);

    /**
     * Reset all validation and error messages.
     * @param formName
     */
    resetValidation(formName);
  }

  declare class IVueFormulatePlugin {
    static install: PluginFunction<IVueFormulate>;
  }

  declare module "vue/types/vue" {
    interface VueConstructor {
      toasted: Toasted;
    }

    interface Vue {
      $toasted: Toasted;
    }
  }

  export default IVueFormulatePlugin;
}
