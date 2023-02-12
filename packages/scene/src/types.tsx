export interface SceneMeta {
  customLighting: boolean;
}

export interface SceneModule {
  triplexMeta: SceneMeta;
  default?: Function;
}