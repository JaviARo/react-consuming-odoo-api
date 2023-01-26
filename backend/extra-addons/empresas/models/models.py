# -*- coding: utf-8 -*-

from odoo import models, fields, api


class empresas_empresas(models.Model):
    _name = 'empresas.empresas'
    _description = 'empresas.empresas'

    name = fields.Char(string="Nombre")
    imagen = fields.Binary(string="Logo corporativo")
    description = fields.Text(string="Descripción")
    ingresos = fields.Integer(string="Ingresos anuales")
    gastos = fields.Integer(string="Gastos anuales")
    beneficios = fields.Integer(string="Beneficio Neto",compute="_beneficios", store=True)
    rentabilidad = fields.Float(string="Rentabilidad del negocio",compute="_rentabilidad", store=True)
    proyectos = fields.One2many("project.project","empresa",string="Proyectos")
    tareas = fields.One2many("project.task","empresa",string="Tareas")

    @api.depends('ingresos','gastos')
    def _beneficios(self):
        for r in self:
            r.beneficios = r.ingresos-r.gastos

    @api.depends('beneficios','gastos')
    def _rentabilidad(self):
        for r in self:
            if r.gastos > 0:
                r.rentabilidad = r.beneficios/r.gastos

class empresas_proyectos(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'
    
    empresa = fields.Many2one("empresas.empresas",string="Empresa",ondelete="cascade")

class empresas_tareas(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
    
    empresa = fields.Many2one("empresas.empresas",string="Empresa",ondelete="cascade")