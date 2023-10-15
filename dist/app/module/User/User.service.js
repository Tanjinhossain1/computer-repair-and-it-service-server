"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.GiveAdminPermission = exports.DeleteUser = exports.UpdateUser = exports.GetAllAdmin = exports.GetAllNormalUser = exports.CreateUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const CreateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data,
    });
    return result;
});
exports.CreateUser = CreateUser;
const GetAllNormalUser = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const userSearchAbleFields = ['email', "firstName", "lastName", "middleName", "role", "contactNo", "gender"];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log(options);
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    /**
     * person = { name: 'fahim' }
     * name = person[name]
     *
     */
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.user.findMany({
        where: Object.assign(Object.assign({}, whereConditons), { role: "user" }),
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            }
    });
    const total = result.length;
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
});
exports.GetAllNormalUser = GetAllNormalUser;
const GetAllAdmin = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const userSearchAbleFields = ['email', "firstName", "lastName", "middleName", "role", "contactNo", "gender"];
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log(options);
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    /**
     * person = { name: 'fahim' }
     * name = person[name]
     *
     */
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.user.findMany({
        where: Object.assign(Object.assign({}, whereConditons), { role: "admin" }),
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createAt: 'desc'
            }
    });
    const total = result.length;
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
});
exports.GetAllAdmin = GetAllAdmin;
const UpdateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield prisma_1.default.user.delete({
        where: {
            id
        },
    });
    return result;
});
exports.DeleteUser = DeleteUser;
const GetProfileDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield prisma_1.default.user.findUnique({
        where: { id }
    });
    return result;
});
const GiveAdminPermission = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield prisma_1.default.user.update({
        where: { id },
        data
    });
    return result;
});
exports.GiveAdminPermission = GiveAdminPermission;
exports.UserServices = {
    CreateUser: exports.CreateUser,
    GetAllNormalUser: exports.GetAllNormalUser,
    GetAllAdmin: exports.GetAllAdmin,
    UpdateUser: exports.UpdateUser,
    DeleteUser: exports.DeleteUser,
    GetProfileDetail,
    GiveAdminPermission: exports.GiveAdminPermission
};
