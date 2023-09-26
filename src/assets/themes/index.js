import { Configs_Default } from "./default/config";
import { Configs_TienThu } from "./tienthu/config";
import { Styles_Default } from './default/index';
import { Styles_TienThu } from './tienthu/index';



export const Themes = {
    Default: {
        Color: Configs_Default.Color,
        Styles: Styles_Default
    },
    TienThu: {
        Color: Configs_TienThu.Color,
        Styles: Styles_TienThu
    }
}