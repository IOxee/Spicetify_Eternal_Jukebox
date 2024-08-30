/**
 * Settings for the branches of the jukebox.
 */
export class JukeboxSettings {
    public static readonly minBeatsBeforeBranching: number = 5;

    // ========
    // Branch distance / Similarity threshold
    // ========

    /**
     * Min allowed distance for a branch.
     */
    public static readonly rangeMinBranchDistance: number = 2;

    /**
     * Max allowed distance for a branch.
     */
    public static readonly rangeMaxBranchDistance: number = 80;

    /**
     * Default allowed distance for a branch.
     */
    private static readonly defaultBranchDistance: number = 30;

    /**
     * Current allowed max distance for a branch.
     */
    public maxBranchDistance: number = JukeboxSettings.defaultBranchDistance;

    /**
     * If true, will ignore the `branchDistance` and dynamically calculate it.
     */
    public useDynamicBranchDistance: boolean = false;

    // ========
    // Branch random chance
    // ========

    // Min: 0, Max: 100

    public static readonly defaultMinRandomBranchChance: number = 0.18;
    public static readonly defaultMaxRandomBranchChance: number = 0.5;

    public minRandomBranchChance: number =
        JukeboxSettings.defaultMinRandomBranchChance;

    public maxRandomBranchChance: number =
        JukeboxSettings.defaultMaxRandomBranchChance;

    // ========
    // Branch probability increase delta
    // ========

    public static readonly minRandomBranchChanceDelta: number = 0.0;
    public static readonly maxRandomBranchChanceDelta: number = 0.2;
    private static readonly defaultRandomBranchChanceDelta: number = 0.018;

    public randomBranchChanceDelta: number =
        JukeboxSettings.defaultRandomBranchChanceDelta;

    // ========
    // Values
    // ========

    /**
     * Max play time.
     */
    public maxJukeboxPlayTime: number = 0;

    // ========
    // Booleans
    // ========

    /**
     * If true, optimize by adding a good last edge.
     */
    public addLastEdge: boolean = true;

    /**
     * If true, only add backward branches.
     */
    public justBackwards: boolean = false;

    /**
     * If true, only add long branches.
     */
    public justLongBranches: boolean = false;

    /**
     * If true, remove consecutive branches of the same distance.
     */
    public removeSequentialBranches: boolean = false;

    /**
     * If true, always branch at the last possible point.
     */
    public alwaysFollowLastBranch: boolean = true;

    public static fromPartial(
        storedSettings: JukeboxStoredSettings,
    ): JukeboxSettings {
        const settings = new JukeboxSettings();

        settings.maxBranchDistance = storedSettings.maxBranchDistance;
        settings.useDynamicBranchDistance =
            storedSettings.useDynamicBranchDistance;
        settings.minRandomBranchChance = storedSettings.minRandomBranchChance;
        settings.maxRandomBranchChance = storedSettings.maxRandomBranchChance;
        settings.randomBranchChanceDelta =
            storedSettings.randomBranchChanceDelta;
        settings.addLastEdge = storedSettings.addLastEdge;
        settings.justBackwards = storedSettings.justBackwards;
        settings.justLongBranches = storedSettings.justLongBranches;
        settings.removeSequentialBranches =
            storedSettings.removeSequentialBranches;
        settings.alwaysFollowLastBranch = storedSettings.alwaysFollowLastBranch;
        settings.maxJukeboxPlayTime = storedSettings.maxJukeboxPlayTime;

        return settings;
    }

    public toPartial(): JukeboxStoredSettings {
        return {
            maxBranchDistance: this.maxBranchDistance,
            useDynamicBranchDistance: this.useDynamicBranchDistance,
            minRandomBranchChance: this.minRandomBranchChance,
            maxRandomBranchChance: this.maxRandomBranchChance,
            randomBranchChanceDelta: this.randomBranchChanceDelta,
            addLastEdge: this.addLastEdge,
            justBackwards: this.justBackwards,
            justLongBranches: this.justLongBranches,
            removeSequentialBranches: this.removeSequentialBranches,
            alwaysFollowLastBranch: this.alwaysFollowLastBranch,
            maxJukeboxPlayTime: this.maxJukeboxPlayTime,
        };
    }
}

export type JukeboxStoredSettings = Pick<
    JukeboxSettings,
    | 'maxBranchDistance'
    | 'useDynamicBranchDistance'
    | 'minRandomBranchChance'
    | 'maxRandomBranchChance'
    | 'randomBranchChanceDelta'
    | 'addLastEdge'
    | 'justBackwards'
    | 'justLongBranches'
    | 'removeSequentialBranches'
    | 'alwaysFollowLastBranch'
    | 'maxJukeboxPlayTime'
>;
