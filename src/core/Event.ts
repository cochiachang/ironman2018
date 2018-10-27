export class CoreEvent{
    public static AssetsLoadComplete: string = "AssetsLoadComplete";
}

export class GameFlowEvent{
    public static GameEndWithTimeout: string = "GameEndWithTimeout";
    public static GameEndWithNoPath: string = "GameEndWithNoPath";
    public static GamePass: string = "GamePass";
    public static ReloadBoardRequest: string = "ReloadBoardRequest";
    public static RevertBackRequest: string = "RevertBackRequest";
    public static BoardNeedReload: string = "BoardNeedReload";
    public static TipsRequest: string = "TipsRequest";
    public static CreateNewGameRequest: string = "CreateNewGameRequest";
    public static GameRoundStart: string = "GameRoundStart";
    public static LinkedLineSuccess: string = "LinkedLineSuccess";
}